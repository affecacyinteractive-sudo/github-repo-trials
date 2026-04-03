import "dotenv/config";
import pg from "pg";

const { Client } = pg;

const snapshotId = process.argv[2] || process.env.SNAPSHOT_ID;
const databaseUrl = process.env.DATABASE_URL;

if (!snapshotId) {
    console.error("Missing snapshot id.");
    console.error("Usage: node scripts/reset-stage4.js <snapshot-id>");
    process.exit(1);
}

if (!databaseUrl) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
}

const client = new Client({
    connectionString: databaseUrl
});

async function main() {
    await client.connect();

    try {
        await client.query("BEGIN");

        const snapshotCheck = await client.query(
            `
      SELECT id, ingest_status
      FROM source_snapshots
      WHERE id = $1
      `,
            [snapshotId]
        );

        if (snapshotCheck.rowCount === 0) {
            throw new Error(`Snapshot not found: ${snapshotId}`);
        }

        const deletedBlocks = await client.query(
            `
      DELETE FROM code_blocks
      WHERE snapshot_id = $1
      `,
            [snapshotId]
        );

        const resetFiles = await client.query(
            `
      UPDATE source_files
      SET parse_status = 'pending',
          updated_at = now()
      WHERE snapshot_id = $1
        AND language = 'rust'
      `,
            [snapshotId]
        );

        const resetSnapshot = await client.query(
            `
      UPDATE source_snapshots
      SET ingest_status = 'manifest_built',
          updated_at = now()
      WHERE id = $1
      RETURNING id, ingest_status
      `,
            [snapshotId]
        );

        await client.query("COMMIT");

        console.log(
            JSON.stringify(
                {
                    ok: true,
                    snapshotId,
                    deletedCodeBlocks: deletedBlocks.rowCount,
                    resetRustFiles: resetFiles.rowCount,
                    snapshot: resetSnapshot.rows[0]
                },
                null,
                2
            )
        );
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        await client.end();
    }
}

main().catch((error) => {
    console.error("reset-stage4 failed:");
    console.error(error instanceof Error ? error.stack || error.message : error);
    process.exit(1);
});