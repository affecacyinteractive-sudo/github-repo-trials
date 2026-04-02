# Quescade Core — Stage 1 Schema and API Contracts

## Purpose
This document defines the first executable system contract for Quescade Core.

It covers:
- the canonical database schema for v1
- the ingest job state model
- the API contracts required for the first implementation stages
- the invariants that later stages must preserve

This document assumes the Stage 0 scope freeze has been accepted.

---

# 1. Design principles

## 1.1 Canonical storage split
- **S3** stores the durable source archive and optional normalized file artifacts.
- **Postgres** stores all queryable metadata and study objects.

## 1.2 Snapshot immutability
A repository snapshot is immutable once created.

A snapshot is defined by:
- provider
- repo identity
- pinned commit SHA

A snapshot must never silently shift to a newer commit.

## 1.3 Idempotent ingestion
Submitting the same public repo at the same resolved commit should not create a logically duplicate snapshot.

## 1.4 Code block traceability
Every extracted code block must map to:
- exactly one snapshot
- exactly one file
- exact line ranges in that file

## 1.5 Strict v1 boundaries
The schema and APIs below deliberately exclude:
- private repos
- sync state with upstream GitHub branches
- embeddings or vector search
- AI-generated artifacts
- user-authored annotations

---

# 2. Core entity model

There are five required core entities in v1:

1. `source_repos`
2. `source_snapshots`
3. `source_files`
4. `code_blocks`
5. `ingest_jobs`

Optional later entities may be added after v1, but these are the canonical minimum.

---

# 3. Schema definition

The schema is written in implementation-ready SQL-oriented form. Types may be adapted to Prisma or another ORM, but the logical fields and constraints should remain stable.

---

## 3.1 source_repos
Represents the logical external repository identity.

### Purpose
A `source_repo` is the stable concept of a repository across multiple snapshots.

### Fields
- `id` UUID primary key
- `provider` TEXT NOT NULL
  - allowed values in v1: `github`
- `owner` TEXT NOT NULL
- `repo_name` TEXT NOT NULL
- `canonical_url` TEXT NOT NULL
- `default_branch` TEXT NULL
- `is_public` BOOLEAN NOT NULL DEFAULT TRUE
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `updated_at` TIMESTAMPTZ NOT NULL DEFAULT now()

### Constraints
- unique: (`provider`, `owner`, `repo_name`)
- unique: (`canonical_url`)

### Notes
- `default_branch` is metadata and may change upstream later; it is not part of snapshot identity.
- `canonical_url` should be normalized to a consistent format.

---

## 3.2 source_snapshots
Represents one immutable ingest of a repository at one exact commit SHA.

### Purpose
This is the canonical snapshot object for all indexing and study operations.

### Fields
- `id` UUID primary key
- `source_repo_id` UUID NOT NULL REFERENCES `source_repos(id)` ON DELETE CASCADE
- `requested_ref` TEXT NULL
  - original requested branch, tag, or commit if present
- `resolved_ref_type` TEXT NULL
  - allowed values in v1: `default_branch`, `branch`, `tag`, `commit`
- `commit_sha` TEXT NOT NULL
- `archive_format` TEXT NOT NULL DEFAULT `zip`
  - allowed values in v1: `zip`, `tarball`
- `archive_s3_key` TEXT NULL
- `archive_checksum_sha256` TEXT NULL
- `archive_size_bytes` BIGINT NULL
- `detected_license_spdx` TEXT NULL
- `detected_license_name` TEXT NULL
- `github_repo_node_id` TEXT NULL
- `ingest_status` TEXT NOT NULL DEFAULT `queued`
- `ingest_rules_version` INTEGER NOT NULL DEFAULT 1
- `ingested_at` TIMESTAMPTZ NULL
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `updated_at` TIMESTAMPTZ NOT NULL DEFAULT now()

### Constraints
- unique: (`source_repo_id`, `commit_sha`)
- check: `commit_sha <> ''`

### Notes
- `archive_s3_key` is nullable until the archive is actually uploaded.
- `ingest_status` reflects current overall snapshot lifecycle, not detailed job-step history.

---

## 3.3 source_files
Represents one file discovered in one snapshot.

### Purpose
A `source_file` is snapshot-scoped. The same path across two commits is not the same row.

### Fields
- `id` UUID primary key
- `snapshot_id` UUID NOT NULL REFERENCES `source_snapshots(id)` ON DELETE CASCADE
- `path` TEXT NOT NULL
- `file_name` TEXT NOT NULL
- `extension` TEXT NULL
- `language` TEXT NULL
- `mime_type` TEXT NULL
- `size_bytes` BIGINT NOT NULL
- `sha256` TEXT NULL
- `text_s3_key` TEXT NULL
- `is_binary` BOOLEAN NOT NULL DEFAULT FALSE
- `is_generated` BOOLEAN NOT NULL DEFAULT FALSE
- `is_excluded` BOOLEAN NOT NULL DEFAULT FALSE
- `excluded_reason` TEXT NULL
- `parse_status` TEXT NOT NULL DEFAULT `pending`
  - allowed values in v1: `pending`, `parsed`, `skipped`, `failed`
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `updated_at` TIMESTAMPTZ NOT NULL DEFAULT now()

### Constraints
- unique: (`snapshot_id`, `path`)

### Notes
- `text_s3_key` is optional for v1. It may point to normalized UTF-8 text content when we choose to store it externally.
- `is_generated` and `is_excluded` are separate because some generated files may be detected even if later retained for limited viewing.

---

## 3.4 code_blocks
Represents one isolated semantic code block extracted from a file.

### Purpose
This is the primary study unit in the product.

### Fields
- `id` UUID primary key
- `snapshot_id` UUID NOT NULL REFERENCES `source_snapshots(id)` ON DELETE CASCADE
- `file_id` UUID NOT NULL REFERENCES `source_files(id)` ON DELETE CASCADE
- `block_kind` TEXT NOT NULL
  - initial values: `function`, `method`, `class`, `interface`, `type`, `test_block`
- `symbol_name` TEXT NULL
- `parent_symbol` TEXT NULL
- `language` TEXT NULL
- `start_line` INTEGER NOT NULL
- `end_line` INTEGER NOT NULL
- `byte_start` INTEGER NULL
- `byte_end` INTEGER NULL
- `content_hash` TEXT NOT NULL
- `content_text` TEXT NOT NULL
- `extraction_mode` TEXT NOT NULL DEFAULT `semantic`
  - allowed values in v1: `semantic`
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `updated_at` TIMESTAMPTZ NOT NULL DEFAULT now()

### Constraints
- check: `start_line > 0`
- check: `end_line >= start_line`
- unique: (`file_id`, `block_kind`, `symbol_name`, `start_line`, `end_line`)

### Notes
- `content_text` is stored directly in Postgres in v1 for simplicity and fast read access.
- `symbol_name` may be null for anonymous or parser-limited constructs, though named extraction is preferred.

---

## 3.5 ingest_jobs
Represents one execution attempt for snapshot ingestion.

### Purpose
Tracks background execution, step progress, retries, and failures.

### Fields
- `id` UUID primary key
- `snapshot_id` UUID NOT NULL REFERENCES `source_snapshots(id)` ON DELETE CASCADE
- `status` TEXT NOT NULL DEFAULT `queued`
  - allowed values: `queued`, `running`, `completed`, `failed`, `cancelled`
- `current_step` TEXT NOT NULL DEFAULT `queued`
- `retry_count` INTEGER NOT NULL DEFAULT 0
- `error_code` TEXT NULL
- `error_message` TEXT NULL
- `started_at` TIMESTAMPTZ NULL
- `finished_at` TIMESTAMPTZ NULL
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
- `updated_at` TIMESTAMPTZ NOT NULL DEFAULT now()

### Constraints
- check: `retry_count >= 0`

### Notes
- Multiple jobs may exist for a snapshot over time if reprocessing is later allowed.
- v1 should usually create one active job per snapshot.

---

# 4. Recommended indexes

## source_repos
- index on `owner`
- index on `repo_name`

## source_snapshots
- unique index on (`source_repo_id`, `commit_sha`)
- index on `ingest_status`
- index on `created_at desc`

## source_files
- unique index on (`snapshot_id`, `path`)
- index on (`snapshot_id`, `language`)
- index on (`snapshot_id`, `is_excluded`)
- index on (`snapshot_id`, `parse_status`)

## code_blocks
- index on `snapshot_id`
- index on `file_id`
- index on (`snapshot_id`, `block_kind`)
- index on (`snapshot_id`, `symbol_name`)

## ingest_jobs
- index on `snapshot_id`
- index on `status`
- index on (`status`, `created_at desc`)

---

# 5. Entity invariants

These invariants are mandatory and should be enforced in code and, where possible, by constraints.

## Repository invariants
- A source repo is identified by provider + owner + repo_name.
- Canonical URL normalization must be deterministic.

## Snapshot invariants
- A snapshot must always have a pinned commit SHA.
- The tuple (`source_repo_id`, `commit_sha`) must be unique.
- A snapshot cannot be marked `completed` unless archive persistence and indexing are complete.

## File invariants
- A file path must be unique within a snapshot.
- A file cannot produce code blocks if it is marked binary.
- A file marked excluded should generally not be parsed for blocks.

## Code block invariants
- A code block must reference an existing file in the same snapshot.
- `start_line` and `end_line` must be valid and ordered.
- Block content must reflect the exact stored file span used during extraction.

## Job invariants
- Only one active running job per snapshot in v1.
- A failed job must preserve step and error context.

---

# 6. Ingest state model

There are two related state surfaces:
- snapshot lifecycle state
- detailed job execution step

---

## 6.1 Snapshot ingest_status
Allowed values:
- `queued`
- `metadata_resolved`
- `archive_stored`
- `unpacked`
- `manifest_built`
- `blocks_extracted`
- `completed`
- `failed`

### Meaning
- `queued`: snapshot record created, work not meaningfully started
- `metadata_resolved`: repo metadata, license, and pinned commit resolved
- `archive_stored`: source archive stored in S3
- `unpacked`: archive safely extracted to worker temp space
- `manifest_built`: file inventory persisted
- `blocks_extracted`: semantic code block extraction completed for supported files
- `completed`: snapshot ready for user-facing browsing
- `failed`: terminal failure during ingest

---

## 6.2 Job current_step
Recommended values:
- `queued`
- `resolve_metadata`
- `download_archive`
- `upload_archive`
- `unpack_archive`
- `classify_files`
- `persist_manifest`
- `extract_blocks`
- `finalize`
- `failed`

### Rules
- `status = running` while actively executing steps
- `status = completed` only after `current_step = finalize` succeeds
- `status = failed` when the job halts and requires intervention or retry

---

# 7. API overview

The v1 API is intentionally narrow.

Required endpoints:
- `POST /api/repos/ingest`
- `GET /api/ingest-jobs/:jobId`
- `GET /api/snapshots/:snapshotId`
- `GET /api/snapshots/:snapshotId/files`
- `GET /api/files/:fileId`
- `GET /api/code-blocks/:blockId`

Optional later endpoints can be added after these stabilize.

Base response conventions:
- JSON only
- ISO-8601 timestamps
- stable UUID identifiers
- no HTML in payloads
- errors return machine-readable code + human-readable message

---

# 8. API contracts

---

## 8.1 POST /api/repos/ingest
Create or reuse a snapshot ingest for a public GitHub repo.

### Purpose
Accept a public GitHub repository URL, normalize it, resolve the requested ref, and enqueue background ingestion.

### Request body
```json
{
  "repoUrl": "https://github.com/owner/repo",
  "ref": "main"
}
```

### Request fields
- `repoUrl` required string
- `ref` optional string
  - may be a branch, tag, or commit SHA

### Behavior
1. validate GitHub URL
2. normalize repository identity
3. fetch repo metadata
4. resolve exact commit SHA
5. create or reuse `source_repo`
6. create or reuse `source_snapshot`
7. create `ingest_job` if snapshot is not already completed
8. return snapshot and job state

### Success response: new or active ingest
```json
{
  "repo": {
    "id": "uuid",
    "provider": "github",
    "owner": "owner",
    "repoName": "repo",
    "canonicalUrl": "https://github.com/owner/repo"
  },
  "snapshot": {
    "id": "uuid",
    "requestedRef": "main",
    "resolvedRefType": "branch",
    "commitSha": "abc123...",
    "detectedLicenseSpdx": "MIT",
    "ingestStatus": "queued",
    "createdAt": "2026-04-02T10:00:00Z"
  },
  "job": {
    "id": "uuid",
    "status": "queued",
    "currentStep": "queued",
    "retryCount": 0,
    "createdAt": "2026-04-02T10:00:00Z"
  }
}
```

### Success response: snapshot already exists and is complete
```json
{
  "repo": {
    "id": "uuid",
    "provider": "github",
    "owner": "owner",
    "repoName": "repo",
    "canonicalUrl": "https://github.com/owner/repo"
  },
  "snapshot": {
    "id": "uuid",
    "requestedRef": "main",
    "resolvedRefType": "branch",
    "commitSha": "abc123...",
    "detectedLicenseSpdx": "MIT",
    "ingestStatus": "completed",
    "createdAt": "2026-04-02T10:00:00Z",
    "ingestedAt": "2026-04-02T10:03:00Z"
  },
  "job": null,
  "reused": true
}
```

### Validation errors
- `400 invalid_repo_url`
- `400 invalid_ref`
- `404 repo_not_found`
- `403 repo_not_public`
- `422 commit_resolution_failed`
- `500 internal_error`

---

## 8.2 GET /api/ingest-jobs/:jobId
Read current status of an ingest job.

### Success response
```json
{
  "id": "uuid",
  "snapshotId": "uuid",
  "status": "running",
  "currentStep": "persist_manifest",
  "retryCount": 0,
  "errorCode": null,
  "errorMessage": null,
  "startedAt": "2026-04-02T10:00:10Z",
  "finishedAt": null,
  "createdAt": "2026-04-02T10:00:00Z",
  "updatedAt": "2026-04-02T10:01:15Z"
}
```

### Errors
- `404 job_not_found`
- `500 internal_error`

---

## 8.3 GET /api/snapshots/:snapshotId
Read snapshot summary for the user-facing overview page.

### Success response
```json
{
  "id": "uuid",
  "repo": {
    "id": "uuid",
    "provider": "github",
    "owner": "owner",
    "repoName": "repo",
    "canonicalUrl": "https://github.com/owner/repo",
    "defaultBranch": "main"
  },
  "requestedRef": "main",
  "resolvedRefType": "branch",
  "commitSha": "abc123...",
  "archiveFormat": "zip",
  "detectedLicenseSpdx": "MIT",
  "detectedLicenseName": "MIT License",
  "ingestStatus": "completed",
  "ingestedAt": "2026-04-02T10:03:00Z",
  "createdAt": "2026-04-02T10:00:00Z",
  "counts": {
    "files": 124,
    "excludedFiles": 18,
    "parsedFiles": 64,
    "codeBlocks": 217
  }
}
```

### Errors
- `404 snapshot_not_found`
- `500 internal_error`

---

## 8.4 GET /api/snapshots/:snapshotId/files
List files for a snapshot.

### Query parameters
- `pathPrefix` optional string
- `language` optional string
- `excluded` optional boolean
- `limit` optional integer, default 100
- `cursor` optional opaque pagination token

### Success response
```json
{
  "items": [
    {
      "id": "uuid",
      "path": "src/utils/math.ts",
      "fileName": "math.ts",
      "extension": ".ts",
      "language": "typescript",
      "sizeBytes": 1420,
      "isBinary": false,
      "isGenerated": false,
      "isExcluded": false,
      "excludedReason": null,
      "parseStatus": "parsed"
    }
  ],
  "nextCursor": null
}
```

### Errors
- `404 snapshot_not_found`
- `400 invalid_query`
- `500 internal_error`

---

## 8.5 GET /api/files/:fileId
Read a single file and summary of extracted blocks.

### Success response
```json
{
  "id": "uuid",
  "snapshotId": "uuid",
  "path": "src/utils/math.ts",
  "fileName": "math.ts",
  "extension": ".ts",
  "language": "typescript",
  "sizeBytes": 1420,
  "isBinary": false,
  "isGenerated": false,
  "isExcluded": false,
  "excludedReason": null,
  "parseStatus": "parsed",
  "content": "export function add(a: number, b: number) { return a + b }",
  "blocks": [
    {
      "id": "uuid",
      "blockKind": "function",
      "symbolName": "add",
      "startLine": 1,
      "endLine": 1
    }
  ]
}
```

### Notes
- `content` may come from Postgres or S3-backed normalized text retrieval.
- For very large files, later versions may truncate content or require a separate content endpoint, but v1 can return the full text for allowed files.

### Errors
- `404 file_not_found`
- `500 internal_error`

---

## 8.6 GET /api/code-blocks/:blockId
Read one isolated semantic code block.

### Success response
```json
{
  "id": "uuid",
  "snapshotId": "uuid",
  "file": {
    "id": "uuid",
    "path": "src/utils/math.ts",
    "language": "typescript"
  },
  "blockKind": "function",
  "symbolName": "add",
  "parentSymbol": null,
  "startLine": 1,
  "endLine": 1,
  "contentText": "export function add(a: number, b: number) { return a + b }",
  "contentHash": "sha256...",
  "extractionMode": "semantic",
  "commitSha": "abc123..."
}
```

### Errors
- `404 code_block_not_found`
- `500 internal_error`

---

# 9. Error envelope

Recommended API error shape:

```json
{
  "error": {
    "code": "invalid_repo_url",
    "message": "The provided repository URL is not a valid public GitHub repository URL."
  }
}
```

Rules:
- `code` is stable and machine-readable
- `message` is human-readable
- do not leak internal stack traces to clients

---

# 10. Suggested SQL DDL

This is a practical baseline. Exact syntax may be adapted.

```sql
CREATE TABLE source_repos (
  id UUID PRIMARY KEY,
  provider TEXT NOT NULL,
  owner TEXT NOT NULL,
  repo_name TEXT NOT NULL,
  canonical_url TEXT NOT NULL,
  default_branch TEXT NULL,
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (provider, owner, repo_name),
  UNIQUE (canonical_url)
);

CREATE TABLE source_snapshots (
  id UUID PRIMARY KEY,
  source_repo_id UUID NOT NULL REFERENCES source_repos(id) ON DELETE CASCADE,
  requested_ref TEXT NULL,
  resolved_ref_type TEXT NULL,
  commit_sha TEXT NOT NULL,
  archive_format TEXT NOT NULL DEFAULT 'zip',
  archive_s3_key TEXT NULL,
  archive_checksum_sha256 TEXT NULL,
  archive_size_bytes BIGINT NULL,
  detected_license_spdx TEXT NULL,
  detected_license_name TEXT NULL,
  github_repo_node_id TEXT NULL,
  ingest_status TEXT NOT NULL DEFAULT 'queued',
  ingest_rules_version INTEGER NOT NULL DEFAULT 1,
  ingested_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (source_repo_id, commit_sha)
);

CREATE TABLE source_files (
  id UUID PRIMARY KEY,
  snapshot_id UUID NOT NULL REFERENCES source_snapshots(id) ON DELETE CASCADE,
  path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  extension TEXT NULL,
  language TEXT NULL,
  mime_type TEXT NULL,
  size_bytes BIGINT NOT NULL,
  sha256 TEXT NULL,
  text_s3_key TEXT NULL,
  is_binary BOOLEAN NOT NULL DEFAULT FALSE,
  is_generated BOOLEAN NOT NULL DEFAULT FALSE,
  is_excluded BOOLEAN NOT NULL DEFAULT FALSE,
  excluded_reason TEXT NULL,
  parse_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (snapshot_id, path)
);

CREATE TABLE code_blocks (
  id UUID PRIMARY KEY,
  snapshot_id UUID NOT NULL REFERENCES source_snapshots(id) ON DELETE CASCADE,
  file_id UUID NOT NULL REFERENCES source_files(id) ON DELETE CASCADE,
  block_kind TEXT NOT NULL,
  symbol_name TEXT NULL,
  parent_symbol TEXT NULL,
  language TEXT NULL,
  start_line INTEGER NOT NULL,
  end_line INTEGER NOT NULL,
  byte_start INTEGER NULL,
  byte_end INTEGER NULL,
  content_hash TEXT NOT NULL,
  content_text TEXT NOT NULL,
  extraction_mode TEXT NOT NULL DEFAULT 'semantic',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (start_line > 0),
  CHECK (end_line >= start_line),
  UNIQUE (file_id, block_kind, symbol_name, start_line, end_line)
);

CREATE TABLE ingest_jobs (
  id UUID PRIMARY KEY,
  snapshot_id UUID NOT NULL REFERENCES source_snapshots(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'queued',
  current_step TEXT NOT NULL DEFAULT 'queued',
  retry_count INTEGER NOT NULL DEFAULT 0,
  error_code TEXT NULL,
  error_message TEXT NULL,
  started_at TIMESTAMPTZ NULL,
  finished_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (retry_count >= 0)
);

CREATE INDEX idx_source_snapshots_status ON source_snapshots (ingest_status);
CREATE INDEX idx_source_snapshots_created_at ON source_snapshots (created_at DESC);
CREATE INDEX idx_source_files_snapshot_language ON source_files (snapshot_id, language);
CREATE INDEX idx_source_files_snapshot_excluded ON source_files (snapshot_id, is_excluded);
CREATE INDEX idx_source_files_snapshot_parse_status ON source_files (snapshot_id, parse_status);
CREATE INDEX idx_code_blocks_snapshot_id ON code_blocks (snapshot_id);
CREATE INDEX idx_code_blocks_file_id ON code_blocks (file_id);
CREATE INDEX idx_code_blocks_snapshot_kind ON code_blocks (snapshot_id, block_kind);
CREATE INDEX idx_code_blocks_snapshot_symbol ON code_blocks (snapshot_id, symbol_name);
CREATE INDEX idx_ingest_jobs_snapshot_id ON ingest_jobs (snapshot_id);
CREATE INDEX idx_ingest_jobs_status_created_at ON ingest_jobs (status, created_at DESC);
```

---

# 11. Implementation notes for Stage 2 and beyond

## Intake behavior
Stage 2 should use `POST /api/repos/ingest` as the single entry point.

## Worker behavior
The worker should update:
- `ingest_jobs.current_step`
- `ingest_jobs.status`
- `source_snapshots.ingest_status`

at each durable transition.

## File parsing behavior
Only files in supported languages should proceed into semantic block extraction in v1.

## Idempotency behavior
If a snapshot already exists for a repo + commit SHA:
- return it
- do not duplicate it
- optionally create a new job only when reprocessing is explicitly allowed later

---

# 12. Stage 1 exit criteria
Stage 1 is complete when all of the following are true:

1. The schema is accepted as the canonical v1 model.
2. The ingest job state model is accepted.
3. The six required endpoints are accepted.
4. Error shapes are accepted.
5. Stage 2 can begin without reopening product scope.

---

# 13. Decision summary
Stage 1 establishes a strict, minimal system:

- one logical repo object
- one immutable snapshot per commit
- one file inventory per snapshot
- one code-block model for isolated study
- one ingest job model for reliable background execution

This is enough to begin implementation without introducing sync, private repos, search, or AI-layer complexity.

