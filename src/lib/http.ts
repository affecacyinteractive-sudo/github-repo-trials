import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { AppError, isAppError } from "@/lib/errors";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function fail(error: AppError) {
  return NextResponse.json(
      {
        error: {
          code: error.code,
          message: error.message
        }
      },
      { status: error.status }
  );
}

export function toAppError(error: unknown) {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof SyntaxError) {
    return new AppError("invalid_json", "Request body must be valid JSON.", 400);
  }

  if (error instanceof ZodError) {
    const firstIssue = error.issues[0];
    return new AppError(
        "invalid_request",
        firstIssue?.message ?? "Request validation failed.",
        400
    );
  }

  return new AppError("internal_error", "An unexpected error occurred.", 500);
}