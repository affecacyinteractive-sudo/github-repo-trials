import crypto from "node:crypto";
import { prisma } from "@/lib/db";
import { AppError, isAppError } from "@/lib/errors";
import { getBlobStore } from "@/lib/storage";
import { extractRustStructuralBlocks } from "@/lib/rust-structural-extractor";

type ExtractBlocksInput = {
    snapshotId: string;
    jobId: string;
};

export async function extractStructuralCodeBlocksForSnapshot(
    input: ExtractBlocksInput
) {
    await prisma.ingestJob.update({
        where: { id: input.jobId },
        data: {
            status: "running",
            currentStep: "extract_blocks",
            startedAt: new Date(),
            finishedAt: null,
            errorCode: null,
            errorMessage: null
        }
    });

    try {
        const rustFiles = await prisma.sourceFile.findMany({
            where: {
                snapshotId: input.snapshotId,
                language: "rust",
                isBinary: false,
                isExcluded: false
            },
            orderBy: {
                path: "asc"
            }
        });

        const blobStore = getBlobStore();
        const codeBlockRows: Array<{
            id: string;
            snapshotId: string;
            fileId: string;
            blockKind: string;
            symbolName: string | null;
            parentSymbol: string | null;
            language: string;
            startLine: number;
            endLine: number;
            byteStart: number | null;
            byteEnd: number | null;
            contentHash: string;
            contentText: string;
            extractionMode: string;
            createdAt: Date;
            updatedAt: Date;
        }> = [];

        const parsedFileIds: string[] = [];
        const failedFileIds: string[] = [];
        const now = new Date();

        for (const file of rustFiles) {
            try {
                if (!file.textS3Key) {
                    throw new AppError(
                        "missing_file_text",
                        `Rust file "${file.path}" has no persisted text content.`,
                        422
                    );
                }

                const content = await blobStore.getText(file.textS3Key);
                if (typeof content !== "string" || content.length === 0) {
                    throw new AppError(
                        "missing_file_text",
                        `Rust file "${file.path}" returned empty text content.`,
                        422
                    );
                }

                const blocks = await extractRustStructuralBlocks(content);

                for (const block of blocks) {
                    codeBlockRows.push({
                        id: crypto.randomUUID(),
                        snapshotId: input.snapshotId,
                        fileId: file.id,
                        blockKind: block.blockKind,
                        symbolName: block.symbolName,
                        parentSymbol: block.parentSymbol,
                        language: block.language,
                        startLine: block.startLine,
                        endLine: block.endLine,
                        byteStart: block.byteStart,
                        byteEnd: block.byteEnd,
                        contentHash: block.contentHash,
                        contentText: block.contentText,
                        extractionMode: block.extractionMode,
                        createdAt: now,
                        updatedAt: now
                    });
                }

                parsedFileIds.push(file.id);
            } catch (error) {
                failedFileIds.push(file.id);

                console.error(`[block-extraction] Failed for ${file.path}:`);
                if (error instanceof Error) {
                    console.error(error.stack ?? error.message);
                } else {
                    console.error(error);
                }
            }
        }

        const result = await prisma.$transaction(async (tx) => {
            await tx.codeBlock.deleteMany({
                where: { snapshotId: input.snapshotId }
            });

            for (let i = 0; i < codeBlockRows.length; i += 250) {
                const chunk = codeBlockRows.slice(i, i + 250);
                if (chunk.length > 0) {
                    await tx.codeBlock.createMany({
                        data: chunk
                    });
                }
            }

            if (parsedFileIds.length > 0) {
                await tx.sourceFile.updateMany({
                    where: {
                        id: {
                            in: parsedFileIds
                        }
                    },
                    data: {
                        parseStatus: "parsed"
                    }
                });
            }

            if (failedFileIds.length > 0) {
                await tx.sourceFile.updateMany({
                    where: {
                        id: {
                            in: failedFileIds
                        }
                    },
                    data: {
                        parseStatus: "failed"
                    }
                });
            }

            const snapshot = await tx.sourceSnapshot.update({
                where: { id: input.snapshotId },
                data: {
                    ingestStatus: "blocks_extracted"
                }
            });

            const job = await tx.ingestJob.update({
                where: { id: input.jobId },
                data: {
                    status: "completed",
                    currentStep: "extract_blocks",
                    finishedAt: new Date(),
                    errorCode: null,
                    errorMessage: null
                }
            });

            return {
                snapshot,
                job,
                extractedBlockCount: codeBlockRows.length,
                parsedFileCount: parsedFileIds.length,
                failedFileCount: failedFileIds.length
            };
        });

        return result;
    } catch (error) {
        await prisma.ingestJob.update({
            where: { id: input.jobId },
            data: {
                status: "failed",
                currentStep: "failed",
                finishedAt: new Date(),
                errorCode: isAppError(error) ? error.code : "block_extraction_failed",
                errorMessage:
                    error instanceof Error ? error.message : "Unknown block extraction failure."
            }
        });

        await prisma.sourceSnapshot.update({
            where: { id: input.snapshotId },
            data: {
                ingestStatus: "failed"
            }
        });

        throw error;
    }
}