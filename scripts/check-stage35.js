const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const REPO_URL = process.env.REPO_URL || "https://github.com/bevyengine/bevy";
const REF = process.env.REF || "main";
const DATABASE_URL = process.env.DATABASE_URL || "";

async function main() {
    console.log(`\n== Stage 3.5 check ==`);
    console.log(`BASE_URL: ${BASE_URL}`);
    console.log(`REPO_URL: ${REPO_URL}`);
    console.log(`REF: ${REF}\n`);

    const ingest = await postJson(`${BASE_URL}/api/repos/ingest`, {
        repoUrl: REPO_URL,
        ref: REF
    });

    if (!ingest.ok) {
        console.error("Ingest request failed:");
        console.error(JSON.stringify(ingest.body, null, 2));
        process.exit(1);
    }

    console.log("Ingest response:");
    console.log(JSON.stringify(ingest.body, null, 2));

    const snapshot = ingest.body?.snapshot;
    const job = ingest.body?.job;

    if (!snapshot?.id) {
        fail("No snapshot id returned from ingest.");
    }

    if (snapshot.ingestStatus !== "manifest_built") {
        fail(
            `Expected snapshot.ingestStatus = "manifest_built", got "${snapshot.ingestStatus}".`
        );
    }

    console.log(`\nSnapshot OK: ${snapshot.id}`);

    if (job) {
        if (job.status !== "completed") {
            fail(`Expected job.status = "completed", got "${job.status}".`);
        }

        console.log(`Job OK: ${job.id}`);
    } else {
        console.log(
            "No job returned because the existing snapshot was reused at manifest_built."
        );
    }

    const filesResp = await getJson(
        `${BASE_URL}/api/snapshots/${snapshot.id}/files?limit=100`
    );

    if (!filesResp.ok) {
        console.error("Snapshot files request failed:");
        console.error(JSON.stringify(filesResp.body, null, 2));
        process.exit(1);
    }

    const files = Array.isArray(filesResp.body?.items) ? filesResp.body.items : [];
    console.log(`\nFiles returned: ${files.length}`);

    if (files.length === 0) {
        fail("No files returned for snapshot.");
    }

    const rustFile =
        files.find(
            (f) =>
                f &&
                f.extension === ".rs" &&
                f.language === "rust" &&
                f.isBinary === false &&
                f.isExcluded === false
        ) || null;

    if (!rustFile) {
        fail("No non-binary, non-excluded Rust file found in snapshot files.");
    }

    console.log(`\nSelected Rust file:`);
    console.log(JSON.stringify(rustFile, null, 2));

    const fileResp = await getJson(`${BASE_URL}/api/files/${rustFile.id}`);

    if (!fileResp.ok) {
        console.error("File detail request failed:");
        console.error(JSON.stringify(fileResp.body, null, 2));
        process.exit(1);
    }

    const fileBody = fileResp.body;

    console.log(`\nFile detail response:`);
    console.log(
        JSON.stringify(
            {
                id: fileBody.id,
                snapshotId: fileBody.snapshotId,
                path: fileBody.path,
                extension: fileBody.extension,
                language: fileBody.language,
                isBinary: fileBody.isBinary,
                isGenerated: fileBody.isGenerated,
                isExcluded: fileBody.isExcluded,
                parseStatus: fileBody.parseStatus,
                contentPreview:
                    typeof fileBody.content === "string"
                        ? fileBody.content.slice(0, 200)
                        : fileBody.content,
                blocksCount: Array.isArray(fileBody.blocks) ? fileBody.blocks.length : 0
            },
            null,
            2
        )
    );

    if (fileBody.isBinary) {
        fail("Selected file is unexpectedly binary.");
    }

    if (fileBody.language !== "rust") {
        fail(`Expected file language "rust", got "${fileBody.language}".`);
    }

    if (typeof fileBody.content === "string" && fileBody.content.length > 0) {
        console.log("\nPASS: Stage 3.5 is working. File content is persisted and readable.");
        process.exit(0);
    }

    console.log(`\nWARN: File content is null or empty for a non-binary Rust file.`);

    if (!DATABASE_URL) {
        console.log(
            "DATABASE_URL is not set, so DB-level text_s3_key verification is skipped."
        );
        console.log(
            "Most likely cause: this snapshot was created before the Stage 3.5 text-persistence patch and was reused."
        );
        process.exit(2);
    }

    const dbResult = await checkFileRowInDb(rustFile.id);

    console.log(`\nDB check:`);
    console.log(JSON.stringify(dbResult, null, 2));

    if (dbResult.error) {
        console.log(
            "Could not run DB check. Most likely 'pg' is missing or DB connection failed."
        );
        process.exit(2);
    }

    if (dbResult.row && !dbResult.row.text_s3_key) {
        console.log(
            "\nDiagnosis: text_s3_key is NULL for this file row. This usually means the snapshot/file rows were created before the Stage 3.5 patch and then reused."
        );
        process.exit(2);
    }

    if (dbResult.row && dbResult.row.text_s3_key) {
        console.log(
            "\nDiagnosis: text_s3_key exists, so the issue is likely in blob-store readback or /api/files/:fileId route wiring."
        );
        process.exit(3);
    }

    console.log(`\nDiagnosis inconclusive.`);
    process.exit(2);
}

async function getJson(url) {
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
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

async function checkFileRowInDb(fileId) {
    let Client;

    try {
        ({ Client } = require("pg"));
    } catch (error) {
        return {
            error: `Could not load pg package: ${
                error instanceof Error ? error.message : String(error)
            }`
        };
    }

    const client = new Client({
        connectionString: DATABASE_URL
    });

    try {
        await client.connect();

        const result = await client.query(
            `
      SELECT
        id,
        snapshot_id,
        path,
        text_s3_key,
        is_binary,
        is_excluded
      FROM source_files
      WHERE id = $1
      `,
            [fileId]
        );

        return {
            row: result.rows[0] || null
        };
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : String(error)
        };
    } finally {
        try {
            await client.end();
        } catch {}
    }
}

function fail(message) {
    console.error(`\nFAIL: ${message}`);
    process.exit(1);
}

main().catch((error) => {
    console.error("\nUnhandled error:");
    console.error(error);
    process.exit(1);
});