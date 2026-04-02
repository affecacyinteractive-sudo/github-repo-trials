import { prisma } from "@/lib/db";
import { AppError } from "@/lib/errors";
import { fail, ok, toAppError } from "@/lib/http";
import { getBlobStore } from "@/lib/storage";

type Params = {
  params: Promise<{ fileId: string }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    const { fileId } = await params;

    const file = await prisma.sourceFile.findUnique({
      where: { id: fileId },
      include: {
        codeBlocks: {
          orderBy: { startLine: "asc" }
        }
      }
    });

    if (!file) {
      throw new AppError("file_not_found", "The requested file was not found.", 404);
    }

    const blobStore = getBlobStore();
    const content = file.textS3Key ? await blobStore.getText(file.textS3Key) : null;

    return ok({
      id: file.id,
      snapshotId: file.snapshotId,
      path: file.path,
      fileName: file.fileName,
      extension: file.extension ?? null,
      language: file.language ?? null,
      sizeBytes: Number(file.sizeBytes),
      isBinary: file.isBinary,
      isGenerated: file.isGenerated,
      isExcluded: file.isExcluded,
      excludedReason: file.excludedReason ?? null,
      parseStatus: file.parseStatus,
      content,
      blocks: file.codeBlocks.map((block) => ({
        id: block.id,
        blockKind: block.blockKind,
        symbolName: block.symbolName ?? null,
        startLine: block.startLine,
        endLine: block.endLine
      }))
    });
  } catch (error) {
    return fail(toAppError(error));
  }
}
