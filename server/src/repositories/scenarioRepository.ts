import scenarioData from "../data/scenarios.json" with { type: "json" };
import type { Room, Scenario, UserNeed } from "../types/scenario.js";

const scenarios = scenarioData as Scenario[];

export function findAllScenarios(): readonly Scenario[] {
  return scenarios;
}

export function findScenarioBySlug(slug: string): Scenario | undefined {
  return scenarios.find((scenario) => scenario.slug === slug);
}

export function findScenarioBySelection(room: Room, need: UserNeed): Scenario | undefined {
  return scenarios.find((scenario) => scenario.room === room && scenario.need === need);
}

