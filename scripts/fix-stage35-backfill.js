import "dotenv/config";
import pg from "pg";

const { Client } = pg;

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const DATABASE_URL = process.env.DATABASE_URL;
const REPO_URL = process.env.REPO_URL || "https://github.com/bevyengine/bevy";
const REF = process.env.REF || "main";

if (!DATABASE_URL) {
    console.error("DATABASE_URL is required.");
    process.exit(1);
}

async function main() {
    console.log("\n== Stage 3.5 backfill fix ==");
    console.log(`BASE_URL: ${BASE_URL}`);
    console.log(`REPO_URL: ${REPO_URL}`);
    console.log(`REF: ${REF}\n`);

    const firstIngest = await postJson(`${BASE_URL}/api/repos/ingest`, {
        repoUrl: REPO_URL,
        ref: REF
    });

    if (!firstIngest.ok) {
        fail("Initial ingest request failed.", firstIngest.body);
    }

    const snapshot = firstIngest.body?.snapshot;
    if (!snapshot?.id) {
        fail("No snapshot id returned from ingest.");
    }

    console.log(`Initial snapshot: ${snapshot.id}`);
    console.log(`Initial ingestStatus: ${snapshot.ingestStatus}`);

    const db = new Client({ connectionString: DATABASE_URL });
    await db.connect();

    try {
        const before = await inspectSnapshot(db, snapshot.id);

        console.log("\nBefore fix:");
        console.log(JSON.stringify(before, null, 2));

        if (Number(before.nonBinaryMissingTextCount) === 0) {
            console.log("\nNo backfill needed. Snapshot already has persisted text.");
        } else {
            console.log(
                `\nBackfill needed. Found ${before.nonBinaryMissingTextCount} non-binary files with NULL text_s3_key.`
            );

            await db.query("BEGIN");

            await db.query(
                `
        DELETE FROM source_files
        WHERE snapshot_id = $1
        `,
                [snapshot.id]
            );

            await db.query(
                `
        UPDATE source_snapshots
        SET ingest_status = 'archive_stored',
            updated_at = now()
        WHERE id = $1
        `,
                [snapshot.id]
            );

            await db.query(
                `
        UPDATE ingest_jobs
        SET status = 'queued',
            current_step = 'queued',
            error_code = NULL,
            error_message = NULL,
            finished_at = NULL,
            updated_at = now()
        WHERE snapshot_id = $1
          AND status IN ('failed', 'completed')
        `,
                [snapshot.id]
            );

            await db.query("COMMIT");

            console.log("\nSnapshot reset to archive_stored and source_files cleared.");
        }
    } catch (error) {
        try {
            await db.query("ROLLBACK");
        } catch {}
        throw error;
    } finally {
        await db.end();
    }

    const secondIngest = await postJson(`${BASE_URL}/api/repos/ingest`, {
        repoUrl: REPO_URL,
        ref: REF
    });

    if (!secondIngest.ok) {
        fail("Rebuild ingest request failed.", secondIngest.body);
    }

    const rebuiltSnapshot = secondIngest.body?.snapshot;
    const rebuiltJob = secondIngest.body?.job;

    console.log("\nAfter rebuild ingest:");
    console.log(JSON.stringify(secondIngest.body, null, 2));

    if (!rebuiltSnapshot?.id) {
        fail("No snapshot returned after rebuild.");
    }

    if (rebuiltSnapshot.ingestStatus !== "manifest_built") {
        fail(
            `Expected rebuilt snapshot.ingestStatus = "manifest_built", got "${rebuiltSnapshot.ingestStatus}".`
        );
    }

    if (rebuiltJob && rebuiltJob.status !== "completed") {
        fail(
            `Expected rebuilt job.status = "completed", got "${rebuiltJob.status}".`
        );
    }

    const filesResp = await getJson(
        `${BASE_URL}/api/snapshots/${rebuiltSnapshot.id}/files?limit=100`
    );

    if (!filesResp.ok) {
        fail("Snapshot files request failed after rebuild.", filesResp.body);
    }

    const files = Array.isArray(filesResp.body?.items) ? filesResp.body.items : [];
    const rustFile = files.find(
        (f) =>
            f &&
            f.extension === ".rs" &&
            f.language === "rust" &&
            f.isBinary === false &&
            f.isExcluded === false
    );

    if (!rustFile) {
        fail("No non-binary Rust file found after rebuild.");
    }

    console.log("\nSelected Rust file:");
    console.log(JSON.stringify(rustFile, null, 2));

    const fileResp = await getJson(`${BASE_URL}/api/files/${rustFile.id}`);

    if (!fileResp.ok) {
        fail("File detail request failed after rebuild.", fileResp.body);
    }

    const fileBody = fileResp.body;

    console.log("\nFile detail preview:");
    console.log(
        JSON.stringify(
            {
                id: fileBody.id,
                path: fileBody.path,
                language: fileBody.language,
                isBinary: fileBody.isBinary,
                isExcluded: fileBody.isExcluded,
                parseStatus: fileBody.parseStatus,
                contentPreview:
                    typeof fileBody.content === "string"
                        ? fileBody.content.slice(0, 200)
                        : fileBody.content
            },
            null,
            2
        )
    );

    if (typeof fileBody.content !== "string" || fileBody.content.length === 0) {
        fail("Backfill ran, but content is still null/empty.");
    }

    console.log(
        "\nPASS: Stage 3.5 backfill completed. Non-binary Rust file content is now persisted and readable."
    );
}

async function inspectSnapshot(db, snapshotId) {
    const snapshotResult = await db.query(
        `
    SELECT
      id,
      ingest_status,
      archive_s3_key
    FROM source_snapshots
    WHERE id = $1
    `,
        [snapshotId]
    );

    const countsResult = await db.query(
        `
    SELECT
      COUNT(*)::int AS total_files,
      COUNT(*) FILTER (WHERE is_binary = false)::int AS non_binary_files,
      COUNT(*) FILTER (
        WHERE is_binary = false
          AND text_s3_key IS NULL
      )::int AS non_binary_missing_text_count
    FROM source_files
    WHERE snapshot_id = $1
    `,
        [snapshotId]
    );

    return {
        snapshot: snapshotResult.rows[0] || null,
        ...countsResult.rows[0],
        nonBinaryMissingTextCount:
            countsResult.rows[0]?.non_binary_missing_text_count ?? 0
    };
}

async function getJson(url) {
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: { Accept: "application/json" }
        });

        return {
            ok: res.ok,
            status: res.status,
            body: await safeJson(res)
        };
    } catch (error) {
        return {
            ok: false,
            status: 0,
            body: {
                error: {
                    code: "network_error",
                    message: error instanceof Error ? error.message : String(error)
                }
            }
        };
    }
}

async function postJson(url, body) {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(body)
        });

        return {
            ok: res.ok,
            status: res.status,
            body: await safeJson(res)
        };
    } catch (error) {
        return {
            ok: false,
            status: 0,
            body: {
                error: {
                    code: "network_error",
                    message: error instanceof Error ? error.message : String(error)
                }
            }
        };
    }
}

async function safeJson(res) {
    const text = await res.text();
    try {
        return text ? JSON.parse(text) : null;
    } catch {
        return { raw: text };
    }
}

function fail(message, details) {
    console.error(`\nFAIL: ${message}`);
    if (details) {
        console.error(JSON.stringify(details, null, 2));
    }
    process.exit(1);
}

main().catch((error) => {
    console.error("\nUnhandled error:");
    console.error(error);
    process.exit(1);
});