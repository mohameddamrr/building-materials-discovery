import { Router } from "express";
import { getScenario, listScenarios, recommendScenario } from "../controllers/scenarioController.js";

export const scenarioRouter = Router();
export const recommendationRouter = Router();

scenarioRouter.get("/", listScenarios);
scenarioRouter.get("/:slug", getScenario);
recommendationRouter.get("/", recommendScenario);

