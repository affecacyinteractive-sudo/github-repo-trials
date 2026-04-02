import { prisma } from "@/lib/db";
import { isAppError } from "@/lib/errors";
import { downloadGithubRepositoryArchive } from "@/lib/github-api";
import { storeArchiveBuffer } from "@/lib/archive-store";

type PersistPinnedArchiveInput = {
    snapshotId: string;
    jobId: string;
    owner: string;
    repoName: string;
    commitSha: string;
    archiveFormat: "zip" | "tarball";
};

export async function persistPinnedArchiveForSnapshot(
    input: PersistPinnedArchiveInput
) {
    await prisma.ingestJob.update({
        where: { id: input.jobId },
        data: {
            status: "running",
            currentStep: "download_archive",
            startedAt: new Date(),
            errorCode: null,
            errorMessage: null
        }
    });

    try {
        const archiveBuffer = await downloadGithubRepositoryArchive(
            input.owner,
            input.repoName,
            input.commitSha,
            input.archiveFormat
        );

        await prisma.ingestJob.update({
            where: { id: input.jobId },
            data: {
                status: "running",
                currentStep: "upload_archive"
            }
        });

        const key = buildArchiveKey({
            owner: input.owner,
            repoName: input.repoName,
            commitSha: input.commitSha,
            archiveFormat: input.archiveFormat
        });

        const stored = await storeArchiveBuffer({
            key,
            body: archiveBuffer
        });

        const snapshot = await prisma.sourceSnapshot.update({
            where: { id: input.snapshotId },
            data: {
                archiveS3Key: stored.key,
                archiveChecksumSha256: stored.sha256,
                archiveSizeBytes: BigInt(stored.sizeBytes),
                ingestStatus: "archive_stored"
            }
        });

        const job = await prisma.ingestJob.update({
            where: { id: input.jobId },
            data: {
                status: "completed",
                currentStep: "upload_archive",
                finishedAt: new Date(),
                errorCode: null,
                errorMessage: null
            }
        });

        return { snapshot, job };
    } catch (error) {
        await prisma.ingestJob.update({
            where: { id: input.jobId },
            data: {
                status: "failed",
                currentStep: "failed",
                finishedAt: new Date(),
                errorCode: isAppError(error) ? error.code : "archive_storage_failed",
                errorMessage:
                    error instanceof Error ? error.message : "Unknown archive failure."
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

function buildArchiveKey(input: {
    owner: string;
    repoName: string;
    commitSha: string;
    archiveFormat: "zip" | "tarball";
}) {
    const extension = input.archiveFormat === "zip" ? "zip" : "tar.gz";

    return [
        "repos",
        "github",
        input.owner,
        input.repoName,
        input.commitSha,
        `source.${extension}`
    ].join("/");
}