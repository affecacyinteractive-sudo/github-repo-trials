import "dotenv/config";

import crypto from "node:crypto";
import { prisma } from "../src/lib/db";
import { getBlobStore } from "../src/lib/storage";
import { SAMPLE_IDS } from "../src/lib/sample-ids";

async function main() {
  const blobStore = getBlobStore();

  const fileContent = 'export function add(a: number, b: number) {\n  return a + b;\n}\n';
  const textKey = "seed/22222222-2222-4222-8222-222222222222/src/utils/math.ts";

  await blobStore.putText(textKey, fileContent);

  await prisma.codeBlock.deleteMany({});
  await prisma.sourceFile.deleteMany({});
  await prisma.ingestJob.deleteMany({});
  await prisma.sourceSnapshot.deleteMany({});
  await prisma.sourceRepo.deleteMany({});

  await prisma.sourceRepo.create({
    data: {
      id: SAMPLE_IDS.repoId,
      provider: "github",
      owner: "example-owner",
      repoName: "example-repo",
      canonicalUrl: "https://github.com/example-owner/example-repo",
      defaultBranch: "main",
      isPublic: true
    }
  });

  await prisma.sourceSnapshot.create({
    data: {
      id: SAMPLE_IDS.snapshotId,
      sourceRepoId: SAMPLE_IDS.repoId,
      requestedRef: "main",
      resolvedRefType: "branch",
      commitSha: "abc123def456abc123def456abc123def456abcd",
      archiveFormat: "zip",
      archiveS3Key: "repos/github/example-owner/example-repo/abc123/source.zip",
      archiveChecksumSha256: crypto.createHash("sha256").update("seed-archive").digest("hex"),
      archiveSizeBytes: BigInt(1024),
      detectedLicenseSpdx: "MIT",
      detectedLicenseName: "MIT License",
      githubRepoNodeId: "R_kgDOEXAMPLE",
      ingestStatus: "completed",
      ingestRulesVersion: 1,
      ingestedAt: new Date("2026-04-02T10:03:00Z")
    }
  });

  await prisma.sourceFile.createMany({
    data: [
      {
        id: SAMPLE_IDS.fileId,
        snapshotId: SAMPLE_IDS.snapshotId,
        path: "src/utils/math.ts",
        fileName: "math.ts",
        extension: ".ts",
        language: "typescript",
        mimeType: "text/plain",
        sizeBytes: BigInt(Buffer.byteLength(fileContent, "utf8")),
        sha256: crypto.createHash("sha256").update(fileContent).digest("hex"),
        textS3Key: textKey,
        isBinary: false,
        isGenerated: false,
        isExcluded: false,
        excludedReason: null,
        parseStatus: "parsed"
      },
      {
        id: SAMPLE_IDS.excludedFileId,
        snapshotId: SAMPLE_IDS.snapshotId,
        path: "dist/app.min.js",
        fileName: "app.min.js",
        extension: ".js",
        language: "javascript",
        mimeType: "text/plain",
        sizeBytes: BigInt(120),
        sha256: crypto.createHash("sha256").update("minified").digest("hex"),
        textS3Key: null,
        isBinary: false,
        isGenerated: true,
        isExcluded: true,
        excludedReason: "minified_file",
        parseStatus: "skipped"
      }
    ]
  });

  await prisma.codeBlock.create({
    data: {
      id: SAMPLE_IDS.codeBlockId,
      snapshotId: SAMPLE_IDS.snapshotId,
      fileId: SAMPLE_IDS.fileId,
      blockKind: "function",
      symbolName: "add",
      parentSymbol: null,
      language: "typescript",
      startLine: 1,
      endLine: 3,
      byteStart: 0,
      byteEnd: fileContent.length,
      contentHash: "39441a0f0f37ba8f1a5ef3bf717953d53469cfd7a8450a8a2221959a67905497",
      contentText: fileContent,
      extractionMode: "semantic"
    }
  });

  await prisma.ingestJob.create({
    data: {
      id: SAMPLE_IDS.ingestJobId,
      snapshotId: SAMPLE_IDS.snapshotId,
      status: "completed",
      currentStep: "finalize",
      retryCount: 0,
      errorCode: null,
      errorMessage: null,
      startedAt: new Date("2026-04-02T10:00:10Z"),
      finishedAt: new Date("2026-04-02T10:03:00Z")
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
