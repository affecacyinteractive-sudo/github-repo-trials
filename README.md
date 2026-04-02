# Quescade Stage 0 + Stage 1 Starter

This starter is intentionally limited to **Stage 0 and Stage 1 only**.

It gives you:

- the Stage 0 scope freeze as project docs
- the Stage 1 database schema in Prisma
- typed API contracts with Zod
- read-only API routes that match the Stage 1 contracts
- a contract-stubbed `POST /api/repos/ingest` route
- local Postgres via Docker
- local blob storage by default
- an S3 storage adapter you can switch on later with env vars

It does **not** include Stage 2+ behavior like real GitHub metadata fetch, commit pinning, archive download, unpacking, workers, or semantic parsing.

## Important fix

This starter now targets **Prisma 7**.

That means:
- connection URLs live in `prisma.config.ts`
- `schema.prisma` no longer contains `url = env("DATABASE_URL")`
- Prisma Client is generated into `src/generated/prisma`
- the runtime client uses the PostgreSQL driver adapter

## Local-first recommendation

Start locally first.

- **Postgres**: run locally with Docker
- **Blob storage**: use the included local filesystem blob store
- **S3**: already abstracted, but leave it off for Stage 0/1

This keeps Stage 1 simple and testable. When you move into real ingestion later, you can switch the blob driver to S3 without rewriting your route layer.

## Quick start

1. Copy env:

```bash
cp .env.example .env
```

2. Start Postgres:

```bash
docker compose up -d
```

3. Confirm Postgres is healthy:

```bash
docker compose ps
docker compose logs postgres
```

4. Install dependencies:

```bash
npm install
```

5. Generate Prisma Client:

```bash
npx prisma generate
```

6. Push schema:

```bash
npx prisma db push
```

7. Seed sample data:

```bash
npm run db:seed
```

8. Start the app:

```bash
npm run dev
```

## If `prisma generate` fails

Make sure you are running the command from the project root.

This project expects:
- `prisma.config.ts` in the root
- `prisma/schema.prisma` in the `prisma` folder
- a `.env` file in the root

## If Postgres does not start

Check:

```bash
docker compose ps
docker compose logs postgres
```

Common local causes:
- port `5432` already in use
- old container named `quescade-postgres` already exists
- Docker Desktop is not running

If port 5432 is busy, either stop the conflicting service or remap the host port in `docker-compose.yml` and update `DATABASE_URL`.

## Project structure

```text
quescade-stage0-stage1-starter/
  app/
    api/
      code-blocks/[blockId]/route.ts
      files/[fileId]/route.ts
      ingest-jobs/[jobId]/route.ts
      repos/ingest/route.ts
      snapshots/[snapshotId]/route.ts
      snapshots/[snapshotId]/files/route.ts
    page.tsx
  prisma/
    schema.prisma
    seed.ts
  prisma.config.ts
  src/lib/
    contracts.ts
    db.ts
    env.ts
    errors.ts
    github-url.ts
    http.ts
    sample-ids.ts
    storage/
      blob-store.ts
      index.ts
      local-blob-store.ts
      s3-blob-store.ts
  docs/
    quescade_stage_0_scope_freeze.md
    quescade_stage_1_schema_and_api_contracts.md
  docker-compose.yml
  package.json
  tsconfig.json
  next.config.mjs
  .env.example
```

## What works now

### Working now
- Prisma schema for the Stage 1 entities
- Seeded data for:
  - one repo
  - one snapshot
  - two files
  - one code block
  - one ingest job
- Read APIs for:
  - job
  - snapshot
  - snapshot files
  - file
  - code block

### Stubbed on purpose
- `POST /api/repos/ingest`

That route validates the request shape and GitHub URL format, then returns `501 not_implemented_stage1`. That is deliberate because real repo intake starts in Stage 2.

## Switching to real S3 later

By default:

```env
BLOB_DRIVER=local
BLOB_LOCAL_ROOT=.quescade/blobs
```

Later, to switch to AWS S3:

```env
BLOB_DRIVER=s3
AWS_REGION=ap-south-1
S3_BUCKET_NAME=your-bucket
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
```

Optional S3-compatible endpoint:

```env
S3_ENDPOINT=http://localhost:9000
S3_FORCE_PATH_STYLE=true
```

## Notes for merging into an existing project

If you already have a Next.js app, the minimum files to copy are:

- `prisma/schema.prisma`
- `prisma/seed.ts`
- `prisma.config.ts`
- `src/lib/*`
- `app/api/*`
- `docs/*`

Then add the dependencies from `package.json`.

## Stage boundary reminder

Do not treat this starter as “the ingest system.” It is only the Stage 0/1 base:
- scope freeze
- schema
- contracts
- storage boundary
- testable read routes

Real GitHub ingestion, archive storage, unpacking, indexing, and block extraction belong to later stages.
