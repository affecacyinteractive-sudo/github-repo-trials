import { prisma } from "@/lib/db";
import { AppError } from "@/lib/errors";
import { fail, ok, toAppError } from "@/lib/http";

type Params = {
  params: Promise<{ snapshotId: string }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    const { snapshotId } = await params;

    const snapshot = await prisma.sourceSnapshot.findUnique({
      where: { id: snapshotId },
      include: {
        sourceRepo: true,
        files: true,
        codeBlocks: true
      }
    });

    const [files, excludedFiles, parsedFiles, codeBlocks] = await Promise.all([
      prisma.sourceFile.count({ where: { snapshotId } }),
      prisma.sourceFile.count({ where: { snapshotId, isExcluded: true } }),
      prisma.sourceFile.count({ where: { snapshotId, parseStatus: "parsed" } }),
      prisma.codeBlock.count({ where: { snapshotId } })
    ]);

    if (!snapshot) {
      throw new AppError("snapshot_not_found", "The requested snapshot was not found.", 404);
    }

    // const excludedFiles = snapshot.files.filter((file) => file.isExcluded).length;
    // const parsedFiles = snapshot.files.filter((file) => file.parseStatus === "parsed").length;

    return ok({
      id: snapshot.id,
      archiveS3Key: snapshot.archiveS3Key ?? null,
      archiveChecksumSha256: snapshot.archiveChecksumSha256 ?? null,
      archiveSizeBytes:
          snapshot.archiveSizeBytes == null ? null : Number(snapshot.archiveSizeBytes),
      repo: {
        id: snapshot.sourceRepo.id,
        provider: snapshot.sourceRepo.provider,
        owner: snapshot.sourceRepo.owner,
        repoName: snapshot.sourceRepo.repoName,
        canonicalUrl: snapshot.sourceRepo.canonicalUrl,
        defaultBranch: snapshot.sourceRepo.defaultBranch ?? null
      },
      requestedRef: snapshot.requestedRef ?? null,
      resolvedRefType: snapshot.resolvedRefType ?? null,
      commitSha: snapshot.commitSha,
      archiveFormat: snapshot.archiveFormat,
      detectedLicenseSpdx: snapshot.detectedLicenseSpdx ?? null,
      detectedLicenseName: snapshot.detectedLicenseName ?? null,
      ingestStatus: snapshot.ingestStatus,
      ingestedAt: snapshot.ingestedAt?.toISOString() ?? null,
      createdAt: snapshot.createdAt.toISOString(),
      counts: {
        files,
        excludedFiles,
        parsedFiles,
        codeBlocks
      }
    });
  } catch (error) {
    return fail(toAppError(error));
  }
}
