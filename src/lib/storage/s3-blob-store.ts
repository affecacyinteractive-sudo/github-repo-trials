import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { BlobStore, BlobPayload } from "@/lib/storage/blob-store";
import { env } from "@/lib/env";

export class S3BlobStore implements BlobStore {
  private readonly client: S3Client;
  private readonly bucketName: string;

  constructor() {
    if (!env.S3_BUCKET_NAME) {
      throw new Error("S3_BUCKET_NAME is required when BLOB_DRIVER=s3");
    }

    this.bucketName = env.S3_BUCKET_NAME;
    this.client = new S3Client({
      region: env.AWS_REGION,
      endpoint: env.S3_ENDPOINT || undefined,
      forcePathStyle: env.S3_FORCE_PATH_STYLE
    });
  }

  async putBuffer(input: BlobPayload): Promise<void> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: input.key,
        Body: input.body,
        ContentType: input.contentType
      })
    );
  }

  async putText(key: string, text: string, contentType = "text/plain; charset=utf-8"): Promise<void> {
    await this.putBuffer({
      key,
      body: Buffer.from(text, "utf8"),
      contentType
    });
  }

  async getText(key: string): Promise<string | null> {
    const response = await this.client.send(
      new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key
      })
    );

    if (!response.Body) {
      return null;
    }

    return await response.Body.transformToString();
  }
}
