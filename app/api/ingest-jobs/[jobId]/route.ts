import { prisma } from "@/lib/db";
import { AppError } from "@/lib/errors";
import { fail, ok, toAppError } from "@/lib/http";

type Params = {
  params: Promise<{ jobId: string }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    const { jobId } = await params;

    const job = await prisma.ingestJob.findUnique({
      where: { id: jobId }
    });

    if (!job) {
      throw new AppError("job_not_found", "The requested ingest job was not found.", 404);
    }

    return ok({
      id: job.id,
      snapshotId: job.snapshotId,
      status: job.status,
      currentStep: job.currentStep,
      retryCount: job.retryCount,
      errorCode: job.errorCode,
      errorMessage: job.errorMessage,
      startedAt: job.startedAt?.toISOString() ?? null,
      finishedAt: job.finishedAt?.toISOString() ?? null,
      createdAt: job.createdAt.toISOString(),
      updatedAt: job.updatedAt.toISOString()
    });
  } catch (error) {
    return fail(toAppError(error));
  }
}
