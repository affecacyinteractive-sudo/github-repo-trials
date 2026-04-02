import { ingestRequestSchema } from "@/lib/contracts";
import { AppError } from "@/lib/errors";
import { fail, ok, toAppError } from "@/lib/http";
import { ingestGithubRepository } from "@/lib/ingest-service";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
      throw new AppError(
          "invalid_content_type",
          "Content-Type must be application/json.",
          415
      );
    }

    const body = ingestRequestSchema.parse(await request.json());
    const result = await ingestGithubRepository(body);

    return ok(result, { status: 200 });
  } catch (error) {
    return fail(toAppError(error));
  }
}