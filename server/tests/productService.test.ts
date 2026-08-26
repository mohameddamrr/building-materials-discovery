import { describe, expect, it } from "vitest";
import { filterProducts } from "../src/services/productService.js";
import type { Product } from "../src/types/product.js";

const fixture: Product[] = [
  {
    id: "board",
    slug: "quiet-board",
    name: "Quiet Board",
    category: "boards",
    shortDescription: "A lining for calm rooms.",
    applications: ["interior-walls"],
    performanceNeeds: ["noise-reduction"],
    tags: ["sound", "bedroom"],
    keyFeatures: ["A fictional test feature"],
    source: { type: "fictional" },
  },
  {
    id: "insulation",
    slug: "warm-insulation",
    name: "Warm Insulation",
    category: "insulation",
    shortDescription: "A cavity layer.",
    applications: ["interior-walls"],
    performanceNeeds: ["thermal-comfort"],
    tags: ["temperature"],
    keyFeatures: ["A fictional test feature"],
    source: { type: "fictional" },
  },
];

describe("filterProducts", () => {
  it("searches names and plain-language tags case-insensitively", () => {
    expect(filterProducts(fixture, { q: "QUIET" })).toEqual([fixture[0]]);
    expect(filterProducts(fixture, { q: "sound" })).toEqual([fixture[0]]);
  });

  it("searches descriptions, categories, applications, and performance needs", () => {
    expect(filterProducts(fixture, { q: "cavity" })).toEqual([fixture[1]]);
    expect(filterProducts(fixture, { q: "boards" })).toEqual([fixture[0]]);
    expect(filterProducts(fixture, { q: "interior-walls" })).toEqual(fixture);
    expect(filterProducts(fixture, { q: "thermal-comfort" })).toEqual([fixture[1]]);
  });

  it("combines search and filters with AND semantics", () => {
    expect(
      filterProducts(fixture, {
        q: "room",
        category: "boards",
        need: "noise-reduction",
      }),
    ).toEqual([fixture[0]]);
    expect(filterProducts(fixture, { category: "insulation", need: "noise-reduction" })).toEqual([]);
  });

  it("treats whitespace-only search as absent and preserves order without mutation", () => {
    const before = [...fixture];

    expect(filterProducts(fixture, { q: "   " })).toEqual(fixture);
    expect(fixture).toEqual(before);
  });
});

