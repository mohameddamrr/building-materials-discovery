import express, { type ErrorRequestHandler } from "express";
import { healthRouter } from "./routes/healthRoutes.js";

export const app = express();

app.disable("x-powered-by");
app.use(express.json());

app.use("/api/health", healthRouter);

app.use((_request, response) => {
  response.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "The requested resource was not found.",
    },
  });
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  void _next;
  console.error(error);
  response.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred.",
    },
  });
};

app.use(errorHandler);
