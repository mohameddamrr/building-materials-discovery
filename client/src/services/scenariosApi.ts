import { ApiError } from "./productsApi";
import type { ResolvedScenario, ScenarioSummary } from "../types/scenario";

export async function getScenarioSummaries(signal?: AbortSignal): Promise<ScenarioSummary[]> {
  const response = await fetch("/api/scenarios", { signal });
  const data = await readJson(response);
  if (!response.ok) throw toApiError(response.status, data);
  if (!isRecord(data) || !Array.isArray(data.scenarios)) throw new ApiError(response.status, "INVALID_RESPONSE", "The scenario response was not valid.");
  return data.scenarios as ScenarioSummary[];
}

export async function getRecommendation(room: string, need: string, signal?: AbortSignal): Promise<ResolvedScenario> {
  const query = new URLSearchParams({ room, need });
  return requestScenario(`/api/recommendations?${query.toString()}`, signal);
}

export async function getScenario(slug: string, signal?: AbortSignal): Promise<ResolvedScenario> {
  return requestScenario(`/api/scenarios/${encodeURIComponent(slug)}`, signal);
}

async function requestScenario(url: string, signal?: AbortSignal): Promise<ResolvedScenario> {
  const response = await fetch(url, { signal });
  const data = await readJson(response);
  if (!response.ok) throw toApiError(response.status, data);
  if (!isRecord(data) || !isResolvedScenario(data.scenario)) throw new ApiError(response.status, "INVALID_RESPONSE", "The scenario response was not valid.");
  return data.scenario;
}

async function readJson(response: Response): Promise<unknown> {
  try { return await response.json(); }
  catch { throw new ApiError(response.status, "INVALID_RESPONSE", "The server returned an unreadable response."); }
}

function toApiError(status: number, data: unknown): ApiError {
  if (isRecord(data) && isRecord(data.error) && typeof data.error.code === "string" && typeof data.error.message === "string") {
    return new ApiError(status, data.error.code, data.error.message);
  }
  return new ApiError(status, "REQUEST_FAILED", "The request could not be completed.");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isResolvedScenario(value: unknown): value is ResolvedScenario {
  return isRecord(value) && typeof value.slug === "string" && typeof value.title === "string" && typeof value.summary === "string" &&
    typeof value.room === "string" && typeof value.need === "string" && value.element === "interior-wall" &&
    Array.isArray(value.layers) && Array.isArray(value.performancePriorities) && Array.isArray(value.recommendations);
}
