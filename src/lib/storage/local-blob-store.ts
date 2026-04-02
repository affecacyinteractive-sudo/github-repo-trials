import fs from "node:fs/promises";
import path from "node:path";
import { BlobStore, BlobPayload } from "@/lib/storage/blob-store";

export class LocalBlobStore implements BlobStore {
  constructor(private readonly rootDir: string) {}

  private resolve(key: string) {
    return path.join(process.cwd(), this.rootDir, key);
  }

  async putBuffer(input: BlobPayload): Promise<void> {
    const filePath = this.resolve(input.key);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, input.body);
  }

  async putText(key: string, text: string): Promise<void> {
    await this.putBuffer({
      key,
      body: Buffer.from(text, "utf8"),
      contentType: "text/plain; charset=utf-8"
    });
  }

  async getText(key: string): Promise<string | null> {
    try {
      const filePath = this.resolve(key);
      return await fs.readFile(filePath, "utf8");
    } catch (error) {
      const nodeError = error as NodeJS.ErrnoException;
      if (nodeError.code === "ENOENT") {
        return null;
      }
      throw error;
    }
  }
}
