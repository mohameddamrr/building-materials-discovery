import { describe, expect, it } from "vitest";
import { findAllProducts } from "../src/repositories/productRepository.js";
import { performanceNeeds, productApplications, productCategories } from "../src/types/product.js";

describe("curated product data", () => {
  const products = findAllProducts();

  it("contains a deliberately small catalogue with unique identifiers", () => {
    expect(products.length).toBeGreaterThanOrEqual(8);
    expect(products.length).toBeLessThanOrEqual(12);
    expect(new Set(products.map((product) => product.id)).size).toBe(products.length);
    expect(new Set(products.map((product) => product.slug)).size).toBe(products.length);
  });

  it("uses supported values and complete display content", () => {
    for (const product of products) {
      expect(product.id.trim()).not.toBe("");
      expect(product.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(product.name.trim()).not.toBe("");
      expect(product.shortDescription.trim()).not.toBe("");
      expect(productCategories).toContain(product.category);
      expect(product.applications.length).toBeGreaterThan(0);
      expect(product.applications.every((application) => productApplications.includes(application))).toBe(true);
      expect(product.performanceNeeds.every((need) => performanceNeeds.includes(need))).toBe(true);
      expect(product.tags.length).toBeGreaterThan(0);
      expect(product.keyFeatures.length).toBeGreaterThan(0);
    }
  });

  it("marks every MVP product as fictional without an external URL", () => {
    for (const product of products) {
      expect(product.source).toEqual({ type: "fictional" });
    }
  });
});

