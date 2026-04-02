export type BlobPayload = {
  key: string;
  contentType?: string;
  body: Buffer;
};

export interface BlobStore {
  putBuffer(input: BlobPayload): Promise<void>;
  putText(key: string, text: string, contentType?: string): Promise<void>;
  getText(key: string): Promise<string | null>;
}
