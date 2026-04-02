import { z } from "zod";

// export const ingestRequestSchema = z.object({
//   repoUrl: z.string().url(),
//   ref: z.string().min(1).max(255).optional()
// });


export const ingestRequestSchema = z.object({
  repoUrl: z.string().trim().min(1, "repoUrl is required."),
  ref: z.string().trim().min(1, "ref cannot be empty.").max(255).optional()
});

export const repoSummarySchema = z.object({
  id: z.string().uuid(),
  provider: z.literal("github"),
  owner: z.string(),
  repoName: z.string(),
  canonicalUrl: z.string().url()
});

export const snapshotSummarySchema = z.object({
  id: z.string().uuid(),
  requestedRef: z.string().nullable(),
  resolvedRefType: z.enum(["default_branch", "branch", "tag", "commit"]).nullable(),
  commitSha: z.string(),
  detectedLicenseSpdx: z.string().nullable(),
  detectedLicenseName: z.string().nullable().optional(),
  ingestStatus: z.enum([
    "queued",
    "metadata_resolved",
    "archive_stored",
    "unpacked",
    "manifest_built",
    "blocks_extracted",
    "completed",
    "failed"
  ]),
  createdAt: z.string().datetime(),
  ingestedAt: z.string().datetime().nullable().optional()
});

export const ingestJobSummarySchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["queued", "running", "completed", "failed", "cancelled"]),
  currentStep: z.enum([
    "queued",
    "resolve_metadata",
    "download_archive",
    "upload_archive",
    "unpack_archive",
    "classify_files",
    "persist_manifest",
    "extract_blocks",
    "finalize",
    "failed"
  ]),
  retryCount: z.number().int().nonnegative(),
  errorCode: z.string().nullable().optional(),
  errorMessage: z.string().nullable().optional(),
  startedAt: z.string().datetime().nullable().optional(),
  finishedAt: z.string().datetime().nullable().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional()
});

export const ingestResponseSchema = z.object({
  repo: repoSummarySchema,
  snapshot: snapshotSummarySchema,
  job: ingestJobSummarySchema.nullable(),
  reused: z.boolean().optional()
});

export const snapshotGetResponseSchema = z.object({
  id: z.string().uuid(),
  repo: z.object({
    id: z.string().uuid(),
    provider: z.literal("github"),
    owner: z.string(),
    repoName: z.string(),
    canonicalUrl: z.string().url(),
    defaultBranch: z.string().nullable()
  }),
  requestedRef: z.string().nullable(),
  resolvedRefType: z.enum(["default_branch", "branch", "tag", "commit"]).nullable(),
  commitSha: z.string(),
  archiveFormat: z.enum(["zip", "tarball"]),
  detectedLicenseSpdx: z.string().nullable(),
  detectedLicenseName: z.string().nullable(),
  ingestStatus: z.enum([
    "queued",
    "metadata_resolved",
    "archive_stored",
    "unpacked",
    "manifest_built",
    "blocks_extracted",
    "completed",
    "failed"
  ]),
  ingestedAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  counts: z.object({
    files: z.number().int().nonnegative(),
    excludedFiles: z.number().int().nonnegative(),
    parsedFiles: z.number().int().nonnegative(),
    codeBlocks: z.number().int().nonnegative()
  })
});

export const snapshotFilesQuerySchema = z.object({
  pathPrefix: z.string().optional(),
  language: z.string().optional(),
  excluded: z
    .enum(["true", "false"])
    .optional()
    .transform((value) =>
      value === undefined ? undefined : value === "true"
    ),
  limit: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : 100))
    .pipe(z.number().int().positive().max(100)),
  cursor: z.string().optional()
});

export const snapshotFileItemSchema = z.object({
  id: z.string().uuid(),
  path: z.string(),
  fileName: z.string(),
  extension: z.string().nullable(),
  language: z.string().nullable(),
  sizeBytes: z.number().int().nonnegative(),
  isBinary: z.boolean(),
  isGenerated: z.boolean(),
  isExcluded: z.boolean(),
  excludedReason: z.string().nullable(),
  parseStatus: z.enum(["pending", "parsed", "skipped", "failed"])
});

export const snapshotFilesResponseSchema = z.object({
  items: z.array(snapshotFileItemSchema),
  nextCursor: z.string().nullable()
});

export const fileGetResponseSchema = z.object({
  id: z.string().uuid(),
  snapshotId: z.string().uuid(),
  path: z.string(),
  fileName: z.string(),
  extension: z.string().nullable(),
  language: z.string().nullable(),
  sizeBytes: z.number().int().nonnegative(),
  isBinary: z.boolean(),
  isGenerated: z.boolean(),
  isExcluded: z.boolean(),
  excludedReason: z.string().nullable(),
  parseStatus: z.enum(["pending", "parsed", "skipped", "failed"]),
  content: z.string().nullable(),
  blocks: z.array(
    z.object({
      id: z.string().uuid(),
      blockKind: z.enum(["function", "method", "class", "interface", "type", "test_block"]),
      symbolName: z.string().nullable(),
      startLine: z.number().int().positive(),
      endLine: z.number().int().positive()
    })
  )
});

export const codeBlockGetResponseSchema = z.object({
  id: z.string().uuid(),
  snapshotId: z.string().uuid(),
  file: z.object({
    id: z.string().uuid(),
    path: z.string(),
    language: z.string().nullable()
  }),
  blockKind: z.enum(["function", "method", "class", "interface", "type", "test_block"]),
  symbolName: z.string().nullable(),
  parentSymbol: z.string().nullable(),
  startLine: z.number().int().positive(),
  endLine: z.number().int().positive(),
  contentText: z.string(),
  contentHash: z.string(),
  extractionMode: z.literal("semantic"),
  commitSha: z.string()
});

export const errorEnvelopeSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string()
  })
});
