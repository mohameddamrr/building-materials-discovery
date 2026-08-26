import express from "express";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { healthRouter } from "./routes/healthRoutes.js";
import { productRouter } from "./routes/productRoutes.js";

export const app = express();

app.disable("x-powered-by");
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/products", productRouter);

app.use(notFoundHandler);
app.use(errorHandler);
