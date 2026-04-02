import { env } from "@/lib/env";
import { BlobStore } from "@/lib/storage/blob-store";
import { LocalBlobStore } from "@/lib/storage/local-blob-store";
import { S3BlobStore } from "@/lib/storage/s3-blob-store";

let singleton: BlobStore | null = null;

export function getBlobStore(): BlobStore {
  if (singleton) {
    return singleton;
  }

  singleton =
    env.BLOB_DRIVER === "s3"
      ? new S3BlobStore()
      : new LocalBlobStore(env.BLOB_LOCAL_ROOT);

  return singleton;
}
