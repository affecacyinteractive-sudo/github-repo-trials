# Quescade Core — Stage 0 Scope Freeze

## Purpose
This document freezes the Version 1 product shape for Quescade Core so that implementation can proceed without scope drift. It defines what we are building first, what we are explicitly not building yet, and the rules that govern later changes.

This document is the prerequisite for Stage 1.

---

## Product statement
Quescade Core is a web app that ingests a **public GitHub repository** at a **pinned commit SHA**, stores the source archive durably in **S3**, indexes repository structure and supported code artifacts in **Postgres**, and allows a user to **study isolated code blocks** rather than only entire files.

The product value of v1 is:
- bring in a public GitHub repo from a URL
- freeze it as an immutable snapshot
- extract meaningful study units from supported source files
- let the user browse repository → file → code block in a stable, reproducible way

---

## Version 1 success definition
Version 1 is considered complete when the following flow works reliably:

1. A user pastes a public GitHub repo URL.
2. The system resolves the repository to an exact commit SHA.
3. The system downloads the pinned source archive.
4. The archive is stored in S3 as the durable source copy.
5. The system unpacks and indexes the repository.
6. Supported source files produce semantic code blocks.
7. The user can browse files and open a code block in isolation.
8. The snapshot, file list, and code blocks are all traceable back to the exact commit.
9. Failures are visible by ingest step and can be retried safely.

---

## In scope for v1

### Source acquisition
- Public GitHub repositories only
- Input via GitHub repo URL
- Optional branch, tag, or commit in the submitted URL or request
- Metadata fetch for repository details
- License detection from GitHub metadata
- Ref resolution to an exact commit SHA before ingestion
- Archive download using GitHub archive endpoints

### Storage
- Original pinned source archive stored in S3
- Postgres used for metadata, file manifests, code blocks, and ingest jobs
- Stable internal identifiers for repo, snapshot, file, and block entities

### Snapshot model
- Immutable snapshots keyed by repository identity + commit SHA
- Re-ingesting the same snapshot should be idempotent
- Snapshot metadata includes repo URL, requested ref, pinned commit SHA, license, timestamps, and storage key

### File indexing
- Archive unpacking in a worker process
- File manifest creation
- File classification into source text, docs, config, binary, excluded/generated
- Exclusion of obvious junk and non-study artifacts
- Indexed file list available in the app

### Code block extraction
- Semantic extraction for a limited supported language set
- Initial supported languages:
  - TypeScript
  - JavaScript
  - Python
- Initial block types:
  - function
  - method
  - class
  - interface/type where applicable
  - test block where feasible
- Every extracted block must map to an exact file path and line range

### User experience
- Repo ingest form
- Ingest job status view
- Snapshot overview page
- File browser/tree
- File detail page
- Code block isolation view
- Display of block metadata including file path, symbol name, block kind, line range, and commit SHA

### Reliability
- Ingest job state machine
- Retry handling for transient failures
- Step-level error reporting
- Safe reprocessing controls

---

## Explicitly out of scope for v1

### Source and auth scope
- Private repositories
- GitHub OAuth sign-in
- GitHub App installation flow
- Multiple source providers
- Manual upload as the main ingestion path

### Sync and update behavior
- Live syncing with GitHub branches
- Automatic re-indexing when upstream changes
- Background polling for repo updates
- Branch comparison or commit diff features

### Search and AI features
- Embeddings
- Vector search
- Semantic search across blocks
- AI summaries
- AI explanations of code
- Auto-generated repo walkthroughs
- Q&A over repository contents

### Collaboration and user features
- Sharing study sets
- Comments, annotations, or team workspaces
- Multi-user permissions model beyond basic app access
- Saved highlights or flashcards

### Advanced parsing scope
- Full support for all programming languages
- Advanced cross-file symbol graphing
- Call graph visualization
- Dependency/license compliance analysis beyond detected repo license
- Build execution, test execution, or runtime evaluation of ingested code

---

## Non-goals
These are things v1 should actively avoid becoming:

- a generic GitHub crawler
- a code search engine
- an AI coding assistant
- a dependency analysis platform
- a code execution sandbox
- a documentation generator

The first product is a **snapshot-based code study system**.

---

## Product boundaries

### Repository boundary
The system ingests one repository at one exact commit SHA.

### Snapshot boundary
A snapshot is immutable. It does not mutate when the upstream branch changes.

### Study-unit boundary
The primary unit of study is the **code block**, not the whole file and not arbitrary text chunks.

### Storage boundary
- S3 is the durable store for source archives and optional normalized artifacts.
- Postgres is the queryable system of record for metadata and study objects.

### Execution boundary
The system never executes ingested repository code.

---

## Quality bar for v1
The system must satisfy the following before expanding scope:

### Correctness
- commit SHA is pinned before archive download
- every snapshot points to the exact archive used for processing
- every indexed block maps back to the correct file and line span

### Reproducibility
- same repo + same commit SHA should resolve to the same logical snapshot
- ingest behavior should be deterministic under the same rules version

### Transparency
- job progress is visible
- failures identify the step that failed
- excluded files are marked clearly

### Safety
- archive extraction is path-safe
- binary and generated files are not misclassified as studyable source
- no code execution occurs during ingest or viewing

---

## Initial exclusions and filtering rules
The system should exclude or deprioritize obvious non-study artifacts during v1 indexing.

Initial exclusions include:
- `node_modules/`
- `dist/`
- `build/`
- `.next/`
- coverage output
- generated assets
- binaries
- minified files
- lockfiles unless later needed for metadata

Each excluded file or path should retain an `excluded_reason` internally.

---

## Supported languages for v1
Initial supported languages for semantic code-block extraction:
- TypeScript
- JavaScript
- Python

Rules:
- only these languages receive semantic block extraction in v1
- unsupported languages may still appear in the file browser
- unsupported languages do not get marketed as equivalent study-block coverage
- generic arbitrary chunking is not allowed to masquerade as semantic block extraction

---

## User stories for v1

### Primary user story
As a user, I can paste a public GitHub repo URL and receive a stable indexed snapshot that I can browse by file and by isolated code block.

### Secondary user stories
- As a user, I can see what commit the snapshot came from.
- As a user, I can inspect the repo’s detected license metadata.
- As a user, I can see which files were indexed and which were excluded.
- As a user, I can open a function or class in isolation for focused study.
- As a user, I can trace that isolated block back to the original file and line range.

---

## Technical operating assumptions

### Frontend and app layer
- Next.js app for UI and app routes
- App creates ingest jobs and renders read views
- Heavy ingest work happens outside the user request path

### Worker model
- Background worker handles archive download, S3 upload, unpacking, indexing, and block extraction
- UI reads job status rather than waiting on long requests

### Database
- Postgres is the canonical metadata store
- Core entities expected in Stage 1:
  - source_repos
  - source_snapshots
  - source_files
  - code_blocks
  - ingest_jobs

### Storage
- S3 stores original source archive as durable acquisition artifact
- Optional normalized artifacts may also be stored in S3 later, but archive storage is required in v1

---

## Change control rules
No new feature enters implementation unless it is attached to:
- a documented user need
- a defined data-model impact
- a failure-mode analysis
- a stage assignment after v1

The following additions are blocked until v1 is complete:
- private repos
- embeddings and semantic search
- AI explanations
- GitHub sync/update engine
- additional providers
- large language expansion beyond the initial supported set

---

## Stage 0 exit criteria
Stage 0 is complete when the team agrees on all of the following:

1. The v1 product statement is accepted.
2. The in-scope and out-of-scope lists are accepted.
3. The initial supported languages are accepted.
4. The success definition for v1 is accepted.
5. The no-drift rules are accepted.
6. Stage 1 can proceed using this document as the boundary.

---

## Decision summary
We are building **a public-GitHub, snapshot-based code study app**.

Not a sync engine.
Not a private repo platform.
Not an AI layer.
Not a general code search product.

The first system is:
**GitHub URL → pinned snapshot → S3 archive → indexed files → semantic code blocks → isolated study UI**

