import { describe, expect, it } from "vitest";
import { findAllProducts } from "../src/repositories/productRepository.js";
import { findScenarioBySlug } from "../src/repositories/scenarioRepository.js";
import { getRecommendation, resolveScenario } from "../src/services/recommendationService.js";

describe("recommendation service", () => {
  it("matches supported selections deterministically and preserves recommendation order", () => {
    const first = getRecommendation("bedroom", "reduce-noise");
    const second = getRecommendation("bedroom", "reduce-noise");

    expect(first).toEqual(second);
    expect(first?.slug).toBe("bedroom-quieter-interior-wall");
    expect(first?.recommendations[0].product.slug).toBe("acoustic-interior-board");
  });

  it("does not substitute an unsupported valid combination", () => {
    expect(getRecommendation("bathroom", "reduce-noise")).toBeUndefined();
  });

  it("hydrates layer and recommendation products from canonical records", () => {
    const result = getRecommendation("bathroom", "manage-moisture");

    expect(result?.layers[0].products[0].slug).toBe("moisture-aware-interior-board");
    expect(result?.recommendations[0].reason).toContain("bathroom-facing layer");
  });

  it("matches and hydrates the thermal-comfort scenario", () => {
    const result = getRecommendation("bedroom", "improve-thermal-comfort");

    expect(result?.slug).toBe("bedroom-thermal-comfort-interior-wall");
    expect(result?.layers[1].products[0].slug).toBe("thermal-cavity-insulation");
    expect(result?.recommendations[0].reason).toContain("cooler or differently conditioned");
  });

  it("fails clearly when curated scenario data references a missing product", () => {
    const scenario = findScenarioBySlug("bedroom-quieter-interior-wall");
    expect(scenario).toBeDefined();
    expect(() => resolveScenario(scenario!, findAllProducts().slice(1))).toThrow(/references missing product/);
  });
});
