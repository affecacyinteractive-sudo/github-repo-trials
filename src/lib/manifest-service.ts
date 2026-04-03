// import os from "node:os";
// import fs from "node:fs/promises";
// import path from "node:path";
// import crypto from "node:crypto";
// import AdmZip from "adm-zip";
// import { prisma } from "@/lib/db";
// import { AppError, isAppError } from "@/lib/errors";
// import { readStoredArchiveBuffer } from "@/lib/archive-store";
//
// type BuildManifestInput = {
//     snapshotId: string;
//     jobId: string;
//     archiveKey: string;
// };
//
// type ManifestRow = {
//     id: string;
//     snapshotId: string;
//     path: string;
//     fileName: string;
//     extension: string | null;
//     language: string | null;
//     mimeType: string | null;
//     sizeBytes: bigint;
//     sha256: string;
//     textS3Key: string | null;
//     isBinary: boolean;
//     isGenerated: boolean;
//     isExcluded: boolean;
//     excludedReason: string | null;
//     parseStatus: "pending" | "skipped";
//     createdAt: Date;
//     updatedAt: Date;
// };
//
// const EXCLUDED_DIRS = new Set([
//     "node_modules",
//     "dist",
//     "build",
//     ".next",
//     "coverage",
//     "target"
// ]);
//
// const EXCLUDED_FILES = new Set([
//     "package-lock.json",
//     "yarn.lock",
//     "pnpm-lock.yaml",
//     "bun.lockb",
//     "Cargo.lock"
// ]);
//
// const BINARY_EXTENSIONS = new Set([
//     ".png",
//     ".jpg",
//     ".jpeg",
//     ".gif",
//     ".webp",
//     ".ico",
//     ".pdf",
//     ".zip",
//     ".gz",
//     ".tar",
//     ".7z",
//     ".rar",
//     ".woff",
//     ".woff2",
//     ".ttf",
//     ".eot",
//     ".otf",
//     ".mp3",
//     ".mp4",
//     ".mov",
//     ".avi",
//     ".wasm",
//     ".so",
//     ".dll",
//     ".dylib",
//     ".exe",
//     ".bin",
//     ".class",
//     ".jar"
// ]);
//
// export async function buildSourceFileManifestFromStoredArchive(
//     input: BuildManifestInput
// ) {
//     await prisma.ingestJob.update({
//         where: { id: input.jobId },
//         data: {
//             status: "running",
//             currentStep: "unpack_archive",
//             startedAt: new Date(),
//             finishedAt: null,
//             errorCode: null,
//             errorMessage: null
//         }
//     });
//
//     const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "quescade-stage3-"));
//
//     try {
//         const archiveBuffer = await readStoredArchiveBuffer(input.archiveKey);
//         await extractZipArchiveSafely(archiveBuffer, tempDir);
//
//         await prisma.sourceSnapshot.update({
//             where: { id: input.snapshotId },
//             data: {
//                 ingestStatus: "unpacked"
//             }
//         });
//
//         await prisma.ingestJob.update({
//             where: { id: input.jobId },
//             data: {
//                 status: "running",
//                 currentStep: "classify_files"
//             }
//         });
//
//         const rows = await buildManifestRows({
//             snapshotId: input.snapshotId,
//             rootDir: tempDir
//         });
//
//         await prisma.ingestJob.update({
//             where: { id: input.jobId },
//             data: {
//                 status: "running",
//                 currentStep: "persist_manifest"
//             }
//         });
//
//         const now = new Date();
//
//         const result = await prisma.$transaction(async (tx) => {
//             await tx.sourceFile.deleteMany({
//                 where: { snapshotId: input.snapshotId }
//             });
//
//             if (rows.length > 0) {
//                 await tx.sourceFile.createMany({
//                     data: rows.map((row) => ({
//                         ...row,
//                         createdAt: now,
//                         updatedAt: now
//                     }))
//                 });
//             }
//
//             const snapshot = await tx.sourceSnapshot.update({
//                 where: { id: input.snapshotId },
//                 data: {
//                     ingestStatus: "manifest_built"
//                 }
//             });
//
//             const job = await tx.ingestJob.update({
//                 where: { id: input.jobId },
//                 data: {
//                     status: "completed",
//                     currentStep: "persist_manifest",
//                     finishedAt: new Date(),
//                     errorCode: null,
//                     errorMessage: null
//                 }
//             });
//
//             return {
//                 snapshot,
//                 job,
//                 fileCount: rows.length
//             };
//         });
//
//         return result;
//     } catch (error) {
//         await prisma.ingestJob.update({
//             where: { id: input.jobId },
//             data: {
//                 status: "failed",
//                 currentStep: "failed",
//                 finishedAt: new Date(),
//                 errorCode: isAppError(error) ? error.code : "manifest_build_failed",
//                 errorMessage:
//                     error instanceof Error ? error.message : "Unknown manifest failure."
//             }
//         });
//
//         await prisma.sourceSnapshot.update({
//             where: { id: input.snapshotId },
//             data: {
//                 ingestStatus: "failed"
//             }
//         });
//
//         throw error;
//     } finally {
//         await fs.rm(tempDir, { recursive: true, force: true });
//     }
// }
//
// async function extractZipArchiveSafely(buffer: Buffer, outputDir: string) {
//     const zip = new AdmZip(buffer);
//     const entries = zip.getEntries();
//
//     for (const entry of entries) {
//         const relativePath = normalizeArchiveEntryPath(entry.entryName);
//
//         if (!relativePath) {
//             continue;
//         }
//
//         const destination = path.resolve(outputDir, ...relativePath.split("/"));
//
//         if (
//             destination !== outputDir &&
//             !destination.startsWith(outputDir + path.sep)
//         ) {
//             throw new AppError(
//                 "unsafe_archive_path",
//                 `Archive entry escaped extraction root: ${entry.entryName}`,
//                 422
//             );
//         }
//
//         if (entry.isDirectory) {
//             await fs.mkdir(destination, { recursive: true });
//             continue;
//         }
//
//         await fs.mkdir(path.dirname(destination), { recursive: true });
//         await fs.writeFile(destination, entry.getData());
//     }
// }
//
// function normalizeArchiveEntryPath(entryName: string) {
//     const raw = entryName.replace(/\\/g, "/");
//     const stripped = raw.includes("/") ? raw.slice(raw.indexOf("/") + 1) : raw;
//     const normalized = path.posix.normalize(stripped).replace(/^\/+/, "");
//
//     if (!normalized || normalized === ".") {
//         return "";
//     }
//
//     if (
//         normalized === ".." ||
//         normalized.startsWith("../") ||
//         normalized.includes("/../")
//     ) {
//         throw new AppError(
//             "unsafe_archive_path",
//             `Archive entry contains invalid traversal: ${entryName}`,
//             422
//         );
//     }
//
//     return normalized;
// }
//
// async function buildManifestRows(input: {
//     snapshotId: string;
//     rootDir: string;
// }): Promise<ManifestRow[]> {
//     const absolutePaths = await walkFiles(input.rootDir);
//     const rows: ManifestRow[] = [];
//
//     for (const absolutePath of absolutePaths) {
//         const relativePath = toPosixPath(path.relative(input.rootDir, absolutePath));
//         const fileName = path.posix.basename(relativePath);
//         const extension = normalizeExtension(path.posix.extname(relativePath));
//
//         const buffer = await fs.readFile(absolutePath);
//         const isBinary =
//             BINARY_EXTENSIONS.has(extension ?? "") || looksBinary(buffer);
//         const isGenerated = detectGenerated(relativePath, buffer);
//         const exclusion = detectExclusion(relativePath, isBinary, isGenerated);
//         const sha256 = crypto.createHash("sha256").update(buffer).digest("hex");
//
//         rows.push({
//             id: crypto.randomUUID(),
//             snapshotId: input.snapshotId,
//             path: relativePath,
//             fileName,
//             extension,
//             language: detectLanguage(extension),
//             mimeType: detectMimeType(extension, isBinary),
//             sizeBytes: BigInt(buffer.byteLength),
//             sha256,
//             textS3Key: null,
//             isBinary,
//             isGenerated,
//             isExcluded: exclusion.isExcluded,
//             excludedReason: exclusion.reason,
//             parseStatus: exclusion.isExcluded || isBinary ? "skipped" : "pending",
//             createdAt: new Date(),
//             updatedAt: new Date()
//         });
//     }
//
//     return rows;
// }
//
// async function walkFiles(rootDir: string): Promise<string[]> {
//     const results: string[] = [];
//
//     async function visit(currentDir: string) {
//         const entries = await fs.readdir(currentDir, { withFileTypes: true });
//
//         for (const entry of entries) {
//             const fullPath = path.join(currentDir, entry.name);
//
//             if (entry.isDirectory()) {
//                 await visit(fullPath);
//             } else if (entry.isFile()) {
//                 results.push(fullPath);
//             }
//         }
//     }
//
//     await visit(rootDir);
//     return results;
// }
//
// function detectExclusion(
//     relativePath: string,
//     isBinary: boolean,
//     isGenerated: boolean
// ) {
//     const segments = relativePath.split("/");
//     const fileName = segments[segments.length - 1];
//
//     if (segments.some((segment) => EXCLUDED_DIRS.has(segment))) {
//         return {
//             isExcluded: true,
//             reason: "excluded_directory"
//         };
//     }
//
//     if (EXCLUDED_FILES.has(fileName)) {
//         return {
//             isExcluded: true,
//             reason: "lockfile"
//         };
//     }
//
//     if (isGenerated) {
//         return {
//             isExcluded: true,
//             reason: "generated_file"
//         };
//     }
//
//     if (isBinary) {
//         return {
//             isExcluded: true,
//             reason: "binary_file"
//         };
//     }
//
//     return {
//         isExcluded: false,
//         reason: null as string | null
//     };
// }
//
// function detectGenerated(relativePath: string, buffer: Buffer) {
//     const lowerPath = relativePath.toLowerCase();
//
//     if (
//         lowerPath.endsWith(".min.js") ||
//         lowerPath.endsWith(".min.css") ||
//         lowerPath.includes("/generated/")
//     ) {
//         return true;
//     }
//
//     const head = buffer.subarray(0, Math.min(buffer.length, 2048)).toString("utf8");
//     return (
//         head.includes("@generated") ||
//         head.includes("Code generated") ||
//         head.includes("DO NOT EDIT")
//     );
// }
//
// function looksBinary(buffer: Buffer) {
//     const sample = buffer.subarray(0, Math.min(buffer.length, 8192));
//
//     for (const byte of sample) {
//         if (byte === 0) {
//             return true;
//         }
//     }
//
//     return false;
// }
//
// function detectLanguage(extension: string | null) {
//     switch (extension) {
//         case ".ts":
//             return "typescript";
//         case ".tsx":
//             return "typescript";
//         case ".js":
//             return "javascript";
//         case ".jsx":
//             return "javascript";
//         case ".py":
//             return "python";
//         case ".rs":
//             return "rust";
//         case ".md":
//             return "markdown";
//         case ".json":
//             return "json";
//         case ".toml":
//             return "toml";
//         case ".yml":
//         case ".yaml":
//             return "yaml";
//         default:
//             return null;
//     }
// }
//
// function detectMimeType(extension: string | null, isBinary: boolean) {
//     if (isBinary) {
//         return "application/octet-stream";
//     }
//
//     switch (extension) {
//         case ".ts":
//         case ".tsx":
//         case ".js":
//         case ".jsx":
//             return "text/plain";
//         case ".py":
//         case ".rs":
//         case ".md":
//         case ".toml":
//         case ".yml":
//         case ".yaml":
//         case ".json":
//             return "text/plain";
//         default:
//             return null;
//     }
// }
//
// function normalizeExtension(extension: string) {
//     return extension ? extension.toLowerCase() : null;
// }
//
// function toPosixPath(value: string) {
//     return value.replace(/\\/g, "/");
// }

import os from "node:os";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import AdmZip from "adm-zip";
import { prisma } from "@/lib/db";
import { AppError, isAppError } from "@/lib/errors";
import { readStoredArchiveBuffer } from "@/lib/archive-store";
import { getBlobStore } from "@/lib/storage";

type BuildManifestInput = {
    snapshotId: string;
    jobId: string;
    archiveKey: string;
};

type ManifestRow = {
    id: string;
    snapshotId: string;
    path: string;
    fileName: string;
    extension: string | null;
    language: string | null;
    mimeType: string | null;
    sizeBytes: bigint;
    sha256: string;
    textS3Key: string | null;
    isBinary: boolean;
    isGenerated: boolean;
    isExcluded: boolean;
    excludedReason: string | null;
    parseStatus: "pending" | "skipped";
    createdAt: Date;
    updatedAt: Date;
};

const EXCLUDED_DIRS = new Set([
    "node_modules",
    "dist",
    "build",
    ".next",
    "coverage",
    "target"
]);

const EXCLUDED_FILES = new Set([
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "bun.lockb",
    "Cargo.lock"
]);

const BINARY_EXTENSIONS = new Set([
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".ico",
    ".pdf",
    ".zip",
    ".gz",
    ".tar",
    ".7z",
    ".rar",
    ".woff",
    ".woff2",
    ".ttf",
    ".eot",
    ".otf",
    ".mp3",
    ".mp4",
    ".mov",
    ".avi",
    ".wasm",
    ".so",
    ".dll",
    ".dylib",
    ".exe",
    ".bin",
    ".class",
    ".jar"
]);

export async function buildSourceFileManifestFromStoredArchive(
    input: BuildManifestInput
) {
    await prisma.ingestJob.update({
        where: { id: input.jobId },
        data: {
            status: "running",
            currentStep: "unpack_archive",
            startedAt: new Date(),
            finishedAt: null,
            errorCode: null,
            errorMessage: null
        }
    });

    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "quescade-stage3-"));

    try {
        const archiveBuffer = await readStoredArchiveBuffer(input.archiveKey);
        await extractZipArchiveSafely(archiveBuffer, tempDir);

        await prisma.sourceSnapshot.update({
            where: { id: input.snapshotId },
            data: {
                ingestStatus: "unpacked"
            }
        });

        await prisma.ingestJob.update({
            where: { id: input.jobId },
            data: {
                status: "running",
                currentStep: "classify_files"
            }
        });

        const rows = await buildManifestRows({
            snapshotId: input.snapshotId,
            rootDir: tempDir
        });

        await prisma.ingestJob.update({
            where: { id: input.jobId },
            data: {
                status: "running",
                currentStep: "persist_manifest"
            }
        });

        const result = await prisma.$transaction(async (tx) => {
            await tx.sourceFile.deleteMany({
                where: { snapshotId: input.snapshotId }
            });

            if (rows.length > 0) {
                await tx.sourceFile.createMany({
                    data: rows
                });
            }

            const snapshot = await tx.sourceSnapshot.update({
                where: { id: input.snapshotId },
                data: {
                    ingestStatus: "manifest_built"
                }
            });

            const job = await tx.ingestJob.update({
                where: { id: input.jobId },
                data: {
                    status: "completed",
                    currentStep: "persist_manifest",
                    finishedAt: new Date(),
                    errorCode: null,
                    errorMessage: null
                }
            });

            return {
                snapshot,
                job,
                fileCount: rows.length
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
                errorCode: isAppError(error) ? error.code : "manifest_build_failed",
                errorMessage:
                    error instanceof Error ? error.message : "Unknown manifest failure."
            }
        });

        await prisma.sourceSnapshot.update({
            where: { id: input.snapshotId },
            data: {
                ingestStatus: "failed"
            }
        });

        throw error;
    } finally {
        await fs.rm(tempDir, { recursive: true, force: true });
    }
}

async function extractZipArchiveSafely(buffer: Buffer, outputDir: string) {
    const zip = new AdmZip(buffer);
    const entries = zip.getEntries();

    for (const entry of entries) {
        const relativePath = normalizeArchiveEntryPath(entry.entryName);

        if (!relativePath) {
            continue;
        }

        const destination = path.resolve(outputDir, ...relativePath.split("/"));

        if (
            destination !== outputDir &&
            !destination.startsWith(outputDir + path.sep)
        ) {
            throw new AppError(
                "unsafe_archive_path",
                `Archive entry escaped extraction root: ${entry.entryName}`,
                422
            );
        }

        if (entry.isDirectory) {
            await fs.mkdir(destination, { recursive: true });
            continue;
        }

        await fs.mkdir(path.dirname(destination), { recursive: true });
        await fs.writeFile(destination, entry.getData());
    }
}

function normalizeArchiveEntryPath(entryName: string) {
    const raw = entryName.replace(/\\/g, "/");
    const stripped = raw.includes("/") ? raw.slice(raw.indexOf("/") + 1) : raw;
    const normalized = path.posix.normalize(stripped).replace(/^\/+/, "");

    if (!normalized || normalized === ".") {
        return "";
    }

    if (
        normalized === ".." ||
        normalized.startsWith("../") ||
        normalized.includes("/../")
    ) {
        throw new AppError(
            "unsafe_archive_path",
            `Archive entry contains invalid traversal: ${entryName}`,
            422
        );
    }

    return normalized;
}

async function buildManifestRows(input: {
    snapshotId: string;
    rootDir: string;
}): Promise<ManifestRow[]> {
    const blobStore = getBlobStore();
    const absolutePaths = await walkFiles(input.rootDir);
    const rows: ManifestRow[] = [];
    const now = new Date();

    for (const absolutePath of absolutePaths) {
        const relativePath = toPosixPath(path.relative(input.rootDir, absolutePath));
        const fileName = path.posix.basename(relativePath);
        const extension = normalizeExtension(path.posix.extname(relativePath));

        const buffer = await fs.readFile(absolutePath);
        const isBinary =
            BINARY_EXTENSIONS.has(extension ?? "") || looksBinary(buffer);
        const isGenerated = detectGenerated(relativePath, buffer);
        const exclusion = detectExclusion(relativePath, isBinary, isGenerated);
        const sha256 = crypto.createHash("sha256").update(buffer).digest("hex");

        let textS3Key: string | null = null;

        if (!isBinary) {
            const normalizedText = normalizeText(buffer);
            textS3Key = buildTextBlobKey({
                snapshotId: input.snapshotId,
                relativePath
            });

            await blobStore.putText(textS3Key, normalizedText);
        }

        rows.push({
            id: crypto.randomUUID(),
            snapshotId: input.snapshotId,
            path: relativePath,
            fileName,
            extension,
            language: detectLanguage(extension),
            mimeType: detectMimeType(extension, isBinary),
            sizeBytes: BigInt(buffer.byteLength),
            sha256,
            textS3Key,
            isBinary,
            isGenerated,
            isExcluded: exclusion.isExcluded,
            excludedReason: exclusion.reason,
            parseStatus: exclusion.isExcluded || isBinary ? "skipped" : "pending",
            createdAt: now,
            updatedAt: now
        });
    }

    return rows;
}

async function walkFiles(rootDir: string): Promise<string[]> {
    const results: string[] = [];

    async function visit(currentDir: string) {
        const entries = await fs.readdir(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                await visit(fullPath);
            } else if (entry.isFile()) {
                results.push(fullPath);
            }
        }
    }

    await visit(rootDir);
    return results;
}

function detectExclusion(
    relativePath: string,
    isBinary: boolean,
    isGenerated: boolean
) {
    const segments = relativePath.split("/");
    const fileName = segments[segments.length - 1];

    if (segments.some((segment) => EXCLUDED_DIRS.has(segment))) {
        return {
            isExcluded: true,
            reason: "excluded_directory"
        };
    }

    if (EXCLUDED_FILES.has(fileName)) {
        return {
            isExcluded: true,
            reason: "lockfile"
        };
    }

    if (isGenerated) {
        return {
            isExcluded: true,
            reason: "generated_file"
        };
    }

    if (isBinary) {
        return {
            isExcluded: true,
            reason: "binary_file"
        };
    }

    return {
        isExcluded: false,
        reason: null as string | null
    };
}

function detectGenerated(relativePath: string, buffer: Buffer) {
    const lowerPath = relativePath.toLowerCase();

    if (
        lowerPath.endsWith(".min.js") ||
        lowerPath.endsWith(".min.css") ||
        lowerPath.includes("/generated/")
    ) {
        return true;
    }

    const head = buffer.subarray(0, Math.min(buffer.length, 2048)).toString("utf8");

    return (
        head.includes("@generated") ||
        head.includes("Code generated") ||
        head.includes("DO NOT EDIT")
    );
}

function looksBinary(buffer: Buffer) {
    const sample = buffer.subarray(0, Math.min(buffer.length, 8192));

    for (const byte of sample) {
        if (byte === 0) {
            return true;
        }
    }

    return false;
}

function normalizeText(buffer: Buffer) {
    let text = buffer.toString("utf8");

    if (text.charCodeAt(0) === 0xfeff) {
        text = text.slice(1);
    }

    return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function buildTextBlobKey(input: {
    snapshotId: string;
    relativePath: string;
}) {
    const pathHash = crypto
        .createHash("sha1")
        .update(`${input.snapshotId}\0${input.relativePath}`)
        .digest("hex");

    const fileName = path.posix.basename(input.relativePath).replace(/[^\w.-]+/g, "_");

    return `snapshots/${input.snapshotId}/texts/${pathHash}-${fileName}.txt`;
}

function detectLanguage(extension: string | null) {
    switch (extension) {
        case ".ts":
        case ".tsx":
            return "typescript";
        case ".js":
        case ".jsx":
            return "javascript";
        case ".py":
            return "python";
        case ".rs":
            return "rust";
        case ".md":
            return "markdown";
        case ".json":
            return "json";
        case ".toml":
            return "toml";
        case ".yml":
        case ".yaml":
            return "yaml";
        default:
            return null;
    }
}

function detectMimeType(extension: string | null, isBinary: boolean) {
    if (isBinary) {
        return "application/octet-stream";
    }

    switch (extension) {
        case ".ts":
        case ".tsx":
        case ".js":
        case ".jsx":
        case ".py":
        case ".rs":
        case ".md":
        case ".toml":
        case ".yml":
        case ".yaml":
        case ".json":
            return "text/plain";
        default:
            return null;
    }
}

function normalizeExtension(extension: string) {
    return extension ? extension.toLowerCase() : null;
}

function toPosixPath(value: string) {
    return value.replace(/\\/g, "/");
}