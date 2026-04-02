import { prisma } from "@/lib/db";
import { snapshotFilesQuerySchema } from "@/lib/contracts";
import { AppError } from "@/lib/errors";
import { fail, ok, toAppError } from "@/lib/http";

type Params = {
  params: Promise<{ snapshotId: string }>;
};

export async function GET(request: Request, { params }: Params) {
  try {
    const { snapshotId } = await params;

    const snapshot = await prisma.sourceSnapshot.findUnique({
      where: { id: snapshotId },
      select: { id: true }
    });

    if (!snapshot) {
      throw new AppError("snapshot_not_found", "The requested snapshot was not found.", 404);
    }

    const url = new URL(request.url);
    const query = snapshotFilesQuerySchema.parse(
      Object.fromEntries(url.searchParams.entries())
    );

    const files = await prisma.sourceFile.findMany({
      where: {
        snapshotId,
        ...(query.pathPrefix ? { path: { startsWith: query.pathPrefix } } : {}),
        ...(query.language ? { language: query.language } : {}),
        ...(query.excluded !== undefined ? { isExcluded: query.excluded } : {})
      },
      take: query.limit + 1,
      ...(query.cursor ? { skip: 1, cursor: { id: query.cursor } } : {}),
      orderBy: { id: "asc" }
    });

    const pageItems = files.slice(0, query.limit);
    const nextCursor = files.length > query.limit ? pageItems[pageItems.length - 1]?.id ?? null : null;

    return ok({
      items: pageItems.map((file) => ({
        id: file.id,
        path: file.path,
        fileName: file.fileName,
        extension: file.extension ?? null,
        language: file.language ?? null,
        sizeBytes: Number(file.sizeBytes),
        isBinary: file.isBinary,
        isGenerated: file.isGenerated,
        isExcluded: file.isExcluded,
        excludedReason: file.excludedReason ?? null,
        parseStatus: file.parseStatus
      })),
      nextCursor
    });
  } catch (error) {
    return fail(toAppError(error));
  }
}
