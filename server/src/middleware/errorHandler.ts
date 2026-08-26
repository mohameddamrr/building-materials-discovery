import type { ErrorRequestHandler, RequestHandler } from "express";
import type { ApiErrorBody } from "../types/api.js";

export const notFoundHandler: RequestHandler = (_request, response) => {
  response.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "The requested resource was not found.",
    },
  } satisfies ApiErrorBody);
};

export const errorHandler: ErrorRequestHandler = (error, _request, response, next) => {
  void next;

  if (isMalformedJsonError(error)) {
    response.status(400).json({
      error: {
        code: "INVALID_JSON",
        message: "The request body contains invalid JSON.",
      },
    } satisfies ApiErrorBody);
    return;
  }

  console.error(error);
  response.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred.",
    },
  } satisfies ApiErrorBody);
};

function isMalformedJsonError(error: unknown): error is SyntaxError & { status: 400; type: string } {
  return (
    error instanceof SyntaxError &&
    "status" in error &&
    error.status === 400 &&
    "type" in error &&
    error.type === "entity.parse.failed"
  );
}

