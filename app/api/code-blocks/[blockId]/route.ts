import { prisma } from "@/lib/db";
import { AppError } from "@/lib/errors";
import { fail, ok, toAppError } from "@/lib/http";

type Params = {
  params: Promise<{ blockId: string }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    const { blockId } = await params;

    const block = await prisma.codeBlock.findUnique({
      where: { id: blockId },
      include: {
        file: true,
        snapshot: true
      }
    });

    if (!block) {
      throw new AppError("code_block_not_found", "The requested code block was not found.", 404);
    }

    return ok({
      id: block.id,
      snapshotId: block.snapshotId,
      file: {
        id: block.file.id,
        path: block.file.path,
        language: block.file.language ?? null
      },
      blockKind: block.blockKind,
      symbolName: block.symbolName ?? null,
      parentSymbol: block.parentSymbol ?? null,
      startLine: block.startLine,
      endLine: block.endLine,
      contentText: block.contentText,
      contentHash: block.contentHash,
      extractionMode: block.extractionMode,
      commitSha: block.snapshot.commitSha
    });
  } catch (error) {
    return fail(toAppError(error));
  }
}
