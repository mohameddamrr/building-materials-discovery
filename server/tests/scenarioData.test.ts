import { describe, expect, it } from "vitest";
import { findAllProducts } from "../src/repositories/productRepository.js";
import { findAllScenarios } from "../src/repositories/scenarioRepository.js";
import { buildingElements, rooms, userNeeds } from "../src/types/scenario.js";

describe("curated scenario data", () => {
  const scenarios = findAllScenarios();
  const productIds = new Set(findAllProducts().map((product) => product.id));

  it("contains exactly the two priority scenarios with unique identities and selections", () => {
    expect(scenarios).toHaveLength(2);
    expect(new Set(scenarios.map(({ id }) => id)).size).toBe(2);
    expect(new Set(scenarios.map(({ slug }) => slug)).size).toBe(2);
    expect(new Set(scenarios.map(({ room, need }) => `${room}:${need}`)).size).toBe(2);
  });

  it("contains complete supported scenario content", () => {
    for (const scenario of scenarios) {
      expect(scenario.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(rooms).toContain(scenario.room);
      expect(buildingElements).toContain(scenario.element);
      expect(userNeeds).toContain(scenario.need);
      expect(scenario.title.trim()).not.toBe("");
      expect(scenario.summary.trim()).not.toBe("");
      expect(scenario.performancePriorities.length).toBeGreaterThan(0);
      expect(scenario.layers.length).toBeGreaterThan(0);
      expect(scenario.recommendations.length).toBeGreaterThan(0);
      expect(new Set(scenario.layers.map(({ id }) => id)).size).toBe(scenario.layers.length);
    }
  });

  it("references only existing products and connects recommendations to layers", () => {
    for (const scenario of scenarios) {
      const layerProductIds = scenario.layers.flatMap(({ productIds: ids }) => ids);
      const recommendationIds = scenario.recommendations.map(({ productId }) => productId);
      expect(layerProductIds.every((id) => productIds.has(id))).toBe(true);
      expect(recommendationIds.every((id) => productIds.has(id))).toBe(true);
      expect(recommendationIds.every((id) => layerProductIds.includes(id))).toBe(true);
      expect(new Set(recommendationIds).size).toBe(recommendationIds.length);
    }
  });

  it("avoids high-risk performance and certification claims", () => {
    const content = JSON.stringify(scenarios);
    expect(content).not.toMatch(/soundproof|waterproof|mould[- ]?proof|certif|guarantee|\b\d+\s?(?:dB|mm|W|U-value)/i);
  });
});

