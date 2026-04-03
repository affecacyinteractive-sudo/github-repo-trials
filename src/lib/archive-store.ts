import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { AppError } from "@/lib/errors";

export type StoredArchive = {
    key: string;
    sizeBytes: number;
    sha256: string;
    absolutePath: string;
};

export async function storeArchiveBuffer(input: {
    key: string;
    body: Buffer;
}): Promise<StoredArchive> {
    const root = getArchiveStorageRoot();
    const key = normalizeArchiveKey(input.key);
    const absolutePath = path.join(root, key);

    await fs.mkdir(path.dirname(absolutePath), { recursive: true });
    await fs.writeFile(absolutePath, input.body);

    const sha256 = crypto.createHash("sha256").update(input.body).digest("hex");

    return {
        key,
        sizeBytes: input.body.byteLength,
        sha256,
        absolutePath
    };
}

export async function readStoredArchiveBuffer(key: string): Promise<Buffer> {
    const root = getArchiveStorageRoot();
    const normalizedKey = normalizeArchiveKey(key);
    const absolutePath = path.join(root, normalizedKey);

    try {
        return await fs.readFile(absolutePath);
    } catch {
        throw new AppError(
            "archive_not_found",
            `Stored archive not found for key "${normalizedKey}".`,
            404
        );
    }
}

function getArchiveStorageRoot() {
    return (
        process.env.ARCHIVE_STORAGE_ROOT?.trim() ||
        path.join(process.cwd(), ".quescade-blob")
    );
}

function normalizeArchiveKey(key: string) {
    const normalized = key.replace(/\\/g, "/").replace(/^\/+/, "");

    if (!normalized || normalized.includes("..")) {
        throw new AppError("invalid_archive_key", "Archive key is invalid.", 500);
    }

    return normalized;
}