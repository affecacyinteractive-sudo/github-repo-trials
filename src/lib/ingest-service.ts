// import crypto from "node:crypto";
// import { prisma } from "@/lib/db";
// import {
//     getGithubRepositoryLicense,
//     getGithubRepositoryMetadata,
//     resolveGithubRef
// } from "@/lib/github-api";
// import { parseGithubRepoUrl } from "@/lib/github-url";
// import { persistPinnedArchiveForSnapshot } from "@/lib/archive-ingest-service";
// import { buildSourceFileManifestFromStoredArchive } from "@/lib/manifest-service";
//
// type IngestInput = {
//     repoUrl: string;
//     ref?: string;
// };
//
// const SNAPSHOT_DONE_STATUSES = new Set([
//     "manifest_built",
//     "blocks_extracted",
//     "completed"
// ]);
//
// export async function ingestGithubRepository(input: IngestInput) {
//     const parsed = parseGithubRepoUrl(input.repoUrl);
//     const requestedRef = normalizeRef(input.ref) ?? parsed.refFromUrl;
//
//     const repoMetadata = await getGithubRepositoryMetadata(
//         parsed.owner,
//         parsed.repoName
//     );
//
//     const licenseMetadata = await getGithubRepositoryLicense(
//         parsed.owner,
//         parsed.repoName
//     );
//
//     const resolvedRef = await resolveGithubRef(
//         parsed.owner,
//         parsed.repoName,
//         requestedRef,
//         repoMetadata.defaultBranch
//     );
//
//     const prep = await prisma.$transaction(async (tx) => {
//         const repo = await tx.sourceRepo.upsert({
//             where: {
//                 canonicalUrl: parsed.canonicalUrl
//             },
//             update: {
//                 defaultBranch: repoMetadata.defaultBranch,
//                 isPublic: true
//             },
//             create: {
//                 id: crypto.randomUUID(),
//                 provider: "github",
//                 owner: parsed.owner,
//                 repoName: parsed.repoName,
//                 canonicalUrl: parsed.canonicalUrl,
//                 defaultBranch: repoMetadata.defaultBranch,
//                 isPublic: true
//             }
//         });
//
//         let snapshot = await tx.sourceSnapshot.findUnique({
//             where: {
//                 sourceRepoId_commitSha: {
//                     sourceRepoId: repo.id,
//                     commitSha: resolvedRef.commitSha
//                 }
//             }
//         });
//
//         let reused = false;
//
//         if (!snapshot) {
//             snapshot = await tx.sourceSnapshot.create({
//                 data: {
//                     id: crypto.randomUUID(),
//                     sourceRepoId: repo.id,
//                     requestedRef: requestedRef ?? null,
//                     resolvedRefType: resolvedRef.resolvedRefType,
//                     commitSha: resolvedRef.commitSha,
//                     archiveFormat: "zip",
//                     detectedLicenseSpdx:
//                         licenseMetadata?.spdxId ?? repoMetadata.licenseSpdx ?? null,
//                     detectedLicenseName:
//                         licenseMetadata?.name ?? repoMetadata.licenseName ?? null,
//                     githubRepoNodeId: repoMetadata.nodeId,
//                     ingestStatus: "metadata_resolved",
//                     ingestRulesVersion: 1
//                 }
//             });
//         } else {
//             reused = true;
//
//             snapshot = await tx.sourceSnapshot.update({
//                 where: { id: snapshot.id },
//                 data: {
//                     requestedRef: requestedRef ?? snapshot.requestedRef,
//                     resolvedRefType: resolvedRef.resolvedRefType,
//                     detectedLicenseSpdx:
//                         licenseMetadata?.spdxId ?? snapshot.detectedLicenseSpdx,
//                     detectedLicenseName:
//                         licenseMetadata?.name ?? snapshot.detectedLicenseName,
//                     githubRepoNodeId: repoMetadata.nodeId
//                 }
//             });
//         }
//
//         if (
//             SNAPSHOT_DONE_STATUSES.has(snapshot.ingestStatus) &&
//             snapshot.archiveS3Key
//         ) {
//             return {
//                 repo,
//                 snapshot,
//                 job: null,
//                 reused: true
//             };
//         }
//
//         let job = await tx.ingestJob.findFirst({
//             where: {
//                 snapshotId: snapshot.id,
//                 status: {
//                     in: ["queued", "running"]
//                 }
//             },
//             orderBy: {
//                 createdAt: "desc"
//             }
//         });
//
//         if (!job) {
//             job = await tx.ingestJob.create({
//                 data: {
//                     id: crypto.randomUUID(),
//                     snapshotId: snapshot.id,
//                     status: "queued",
//                     currentStep: "queued",
//                     retryCount: 0
//                 }
//             });
//         }
//
//         return {
//             repo,
//             snapshot,
//             job,
//             reused
//         };
//     });
//
//     if (!prep.job) {
//         return {
//             repo: mapRepo(prep.repo),
//             snapshot: mapSnapshot(prep.snapshot),
//             job: null,
//             reused: prep.reused
//         };
//     }
//
//     let currentSnapshot = prep.snapshot;
//     let currentJob = prep.job;
//
//     if (!currentSnapshot.archiveS3Key) {
//         const archiveResult = await persistPinnedArchiveForSnapshot({
//             snapshotId: currentSnapshot.id,
//             jobId: currentJob.id,
//             owner: parsed.owner,
//             repoName: parsed.repoName,
//             commitSha: resolvedRef.commitSha,
//             archiveFormat: "zip"
//         });
//
//         currentSnapshot = archiveResult.snapshot;
//         currentJob = archiveResult.job;
//     }
//
//     if (currentSnapshot.ingestStatus !== "manifest_built") {
//         const manifestResult = await buildSourceFileManifestFromStoredArchive({
//             snapshotId: currentSnapshot.id,
//             jobId: currentJob.id,
//             archiveKey: currentSnapshot.archiveS3Key!
//         });
//
//         currentSnapshot = manifestResult.snapshot;
//         currentJob = manifestResult.job;
//     }
//
//     return {
//         repo: mapRepo(prep.repo),
//         snapshot: mapSnapshot(currentSnapshot),
//         job: mapJob(currentJob),
//         reused: prep.reused
//     };
// }
//
// function normalizeRef(ref?: string) {
//     const value = ref?.trim();
//     return value ? value : undefined;
// }
//
// function mapRepo(repo: any) {
//     return {
//         id: repo.id,
//         provider: repo.provider,
//         owner: repo.owner,
//         repoName: repo.repoName,
//         canonicalUrl: repo.canonicalUrl
//     };
// }
//
// function mapSnapshot(snapshot: any) {
//     return {
//         id: snapshot.id,
//         requestedRef: snapshot.requestedRef,
//         resolvedRefType: snapshot.resolvedRefType,
//         commitSha: snapshot.commitSha,
//         detectedLicenseSpdx: snapshot.detectedLicenseSpdx,
//         ingestStatus: snapshot.ingestStatus,
//         archiveS3Key: snapshot.archiveS3Key ?? null,
//         archiveChecksumSha256: snapshot.archiveChecksumSha256 ?? null,
//         archiveSizeBytes:
//             snapshot.archiveSizeBytes == null
//                 ? null
//                 : Number(snapshot.archiveSizeBytes),
//         createdAt: snapshot.createdAt,
//         ingestedAt: snapshot.ingestedAt ?? null
//     };
// }
//
// function mapJob(job: any) {
//     return {
//         id: job.id,
//         status: job.status,
//         currentStep: job.currentStep,
//         retryCount: job.retryCount,
//         createdAt: job.createdAt,
//         startedAt: job.startedAt ?? null,
//         finishedAt: job.finishedAt ?? null,
//         errorCode: job.errorCode ?? null,
//         errorMessage: job.errorMessage ?? null
//     };
// }

import crypto from "node:crypto";
import { prisma } from "@/lib/db";
import {
    getGithubRepositoryLicense,
    getGithubRepositoryMetadata,
    resolveGithubRef
} from "@/lib/github-api";
import { parseGithubRepoUrl } from "@/lib/github-url";
import { persistPinnedArchiveForSnapshot } from "@/lib/archive-ingest-service";
import { buildSourceFileManifestFromStoredArchive } from "@/lib/manifest-service";
import { extractStructuralCodeBlocksForSnapshot } from "@/lib/block-extraction-service";

type IngestInput = {
    repoUrl: string;
    ref?: string;
};

const SNAPSHOT_DONE_STATUSES = new Set(["blocks_extracted", "completed"]);

export async function ingestGithubRepository(input: IngestInput) {
    const parsed = parseGithubRepoUrl(input.repoUrl);
    const requestedRef = normalizeRef(input.ref) ?? parsed.refFromUrl;

    const repoMetadata = await getGithubRepositoryMetadata(
        parsed.owner,
        parsed.repoName
    );

    const licenseMetadata = await getGithubRepositoryLicense(
        parsed.owner,
        parsed.repoName
    );

    const resolvedRef = await resolveGithubRef(
        parsed.owner,
        parsed.repoName,
        requestedRef,
        repoMetadata.defaultBranch
    );

    const prep = await prisma.$transaction(async (tx) => {
        const repo = await tx.sourceRepo.upsert({
            where: {
                canonicalUrl: parsed.canonicalUrl
            },
            update: {
                defaultBranch: repoMetadata.defaultBranch,
                isPublic: true
            },
            create: {
                id: crypto.randomUUID(),
                provider: "github",
                owner: parsed.owner,
                repoName: parsed.repoName,
                canonicalUrl: parsed.canonicalUrl,
                defaultBranch: repoMetadata.defaultBranch,
                isPublic: true
            }
        });

        let snapshot = await tx.sourceSnapshot.findUnique({
            where: {
                sourceRepoId_commitSha: {
                    sourceRepoId: repo.id,
                    commitSha: resolvedRef.commitSha
                }
            }
        });

        let reused = false;

        if (!snapshot) {
            snapshot = await tx.sourceSnapshot.create({
                data: {
                    id: crypto.randomUUID(),
                    sourceRepoId: repo.id,
                    requestedRef: requestedRef ?? null,
                    resolvedRefType: resolvedRef.resolvedRefType,
                    commitSha: resolvedRef.commitSha,
                    archiveFormat: "zip",
                    detectedLicenseSpdx:
                        licenseMetadata?.spdxId ?? repoMetadata.licenseSpdx ?? null,
                    detectedLicenseName:
                        licenseMetadata?.name ?? repoMetadata.licenseName ?? null,
                    githubRepoNodeId: repoMetadata.nodeId,
                    ingestStatus: "metadata_resolved",
                    ingestRulesVersion: 1
                }
            });
        } else {
            reused = true;

            snapshot = await tx.sourceSnapshot.update({
                where: { id: snapshot.id },
                data: {
                    requestedRef: requestedRef ?? snapshot.requestedRef,
                    resolvedRefType: resolvedRef.resolvedRefType,
                    detectedLicenseSpdx:
                        licenseMetadata?.spdxId ?? snapshot.detectedLicenseSpdx,
                    detectedLicenseName:
                        licenseMetadata?.name ?? snapshot.detectedLicenseName,
                    githubRepoNodeId: repoMetadata.nodeId
                }
            });
        }

        if (
            snapshot.archiveS3Key &&
            SNAPSHOT_DONE_STATUSES.has(snapshot.ingestStatus)
        ) {
            return {
                repo,
                snapshot,
                job: null,
                reused: true
            };
        }

        let job = await tx.ingestJob.findFirst({
            where: {
                snapshotId: snapshot.id,
                status: {
                    in: ["queued", "running"]
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        if (!job) {
            job = await tx.ingestJob.create({
                data: {
                    id: crypto.randomUUID(),
                    snapshotId: snapshot.id,
                    status: "queued",
                    currentStep: "queued",
                    retryCount: 0
                }
            });
        }

        return {
            repo,
            snapshot,
            job,
            reused
        };
    });

    if (!prep.job) {
        return {
            repo: mapRepo(prep.repo),
            snapshot: mapSnapshot(prep.snapshot),
            job: null,
            reused: prep.reused
        };
    }

    let currentSnapshot = prep.snapshot;
    let currentJob = prep.job;

    if (!currentSnapshot.archiveS3Key) {
        const archiveResult = await persistPinnedArchiveForSnapshot({
            snapshotId: currentSnapshot.id,
            jobId: currentJob.id,
            owner: parsed.owner,
            repoName: parsed.repoName,
            commitSha: resolvedRef.commitSha,
            archiveFormat: "zip"
        });

        currentSnapshot = archiveResult.snapshot;
        currentJob = archiveResult.job;
    }

    if (
        currentSnapshot.ingestStatus !== "manifest_built" &&
        currentSnapshot.ingestStatus !== "blocks_extracted" &&
        currentSnapshot.ingestStatus !== "completed"
    ) {
        const manifestResult = await buildSourceFileManifestFromStoredArchive({
            snapshotId: currentSnapshot.id,
            jobId: currentJob.id,
            archiveKey: currentSnapshot.archiveS3Key!
        });

        currentSnapshot = manifestResult.snapshot;
        currentJob = manifestResult.job;
    }

    if (
        currentSnapshot.ingestStatus !== "blocks_extracted" &&
        currentSnapshot.ingestStatus !== "completed"
    ) {
        const extractionResult = await extractStructuralCodeBlocksForSnapshot({
            snapshotId: currentSnapshot.id,
            jobId: currentJob.id
        });

        currentSnapshot = extractionResult.snapshot;
        currentJob = extractionResult.job;
    }

    return {
        repo: mapRepo(prep.repo),
        snapshot: mapSnapshot(currentSnapshot),
        job: mapJob(currentJob),
        reused: prep.reused
    };
}

function normalizeRef(ref?: string) {
    const value = ref?.trim();
    return value ? value : undefined;
}

function mapRepo(repo: any) {
    return {
        id: repo.id,
        provider: repo.provider,
        owner: repo.owner,
        repoName: repo.repoName,
        canonicalUrl: repo.canonicalUrl
    };
}

function mapSnapshot(snapshot: any) {
    return {
        id: snapshot.id,
        requestedRef: snapshot.requestedRef,
        resolvedRefType: snapshot.resolvedRefType,
        commitSha: snapshot.commitSha,
        detectedLicenseSpdx: snapshot.detectedLicenseSpdx,
        ingestStatus: snapshot.ingestStatus,
        archiveS3Key: snapshot.archiveS3Key ?? null,
        archiveChecksumSha256: snapshot.archiveChecksumSha256 ?? null,
        archiveSizeBytes:
            snapshot.archiveSizeBytes == null
                ? null
                : Number(snapshot.archiveSizeBytes),
        createdAt: snapshot.createdAt,
        ingestedAt: snapshot.ingestedAt ?? null
    };
}

function mapJob(job: any) {
    return {
        id: job.id,
        status: job.status,
        currentStep: job.currentStep,
        retryCount: job.retryCount,
        createdAt: job.createdAt,
        startedAt: job.startedAt ?? null,
        finishedAt: job.finishedAt ?? null,
        errorCode: job.errorCode ?? null,
        errorMessage: job.errorMessage ?? null
    };
}