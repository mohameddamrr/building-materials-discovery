import type { RequestHandler } from "express";
import { getRecommendation, getResolvedScenarioBySlug, listScenarioSummaries } from "../services/recommendationService.js";
import type { ApiErrorBody } from "../types/api.js";
import { rooms, userNeeds, type Room, type UserNeed } from "../types/scenario.js";

export const listScenarios: RequestHandler = (_request, response) => {
  const scenarios = listScenarioSummaries();
  response.status(200).json({ scenarios, total: scenarios.length });
};

export const getScenario: RequestHandler = (request, response) => {
  const slug = request.params.slug;
  const scenario = typeof slug === "string" ? getResolvedScenarioBySlug(slug) : undefined;
  if (!scenario) returnScenarioNotFound(response);
  else response.status(200).json({ scenario });
};

export const recommendScenario: RequestHandler = (request, response) => {
  const parsed = parseRecommendationQuery(request.query);
  if (!parsed.ok) {
    response.status(400).json(parsed.error);
    return;
  }

  const scenario = getRecommendation(parsed.room, parsed.need);
  if (!scenario) {
    response.status(404).json({ error: { code: "SCENARIO_NOT_FOUND", message: "No guided scenario supports that room and need combination." } } satisfies ApiErrorBody);
    return;
  }
  response.status(200).json({ scenario });
};

function returnScenarioNotFound(response: Parameters<RequestHandler>[1]) {
  response.status(404).json({ error: { code: "SCENARIO_NOT_FOUND", message: "The requested scenario was not found." } } satisfies ApiErrorBody);
}

type ParsedRecommendation = { ok: true; room: Room; need: UserNeed } | { ok: false; error: ApiErrorBody };

export function parseRecommendationQuery(query: Record<string, unknown>): ParsedRecommendation {
  const details: Record<string, string> = {};
  const unknown = Object.keys(query).filter((key) => key !== "room" && key !== "need");
  if (unknown.length) details.query = `Unsupported parameter${unknown.length === 1 ? "" : "s"}: ${unknown.join(", ")}.`;
  const room = parseRequiredEnum(query.room, "room", rooms, details);
  const need = parseRequiredEnum(query.need, "need", userNeeds, details);
  if (Object.keys(details).length) return { ok: false, error: { error: { code: "INVALID_RECOMMENDATION_QUERY", message: "Room and need must identify one supported guided scenario.", details } } };
  return { ok: true, room: room as Room, need: need as UserNeed };
}

function parseRequiredEnum<T extends string>(value: unknown, name: string, values: readonly T[], details: Record<string, string>): T | undefined {
  if (typeof value !== "string" || !values.includes(value as T)) {
    details[name] = `A single supported value is required: ${values.join(", ")}.`;
    return undefined;
  }
  return value as T;
}

