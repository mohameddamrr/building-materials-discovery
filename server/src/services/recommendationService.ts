import { findAllProducts } from "../repositories/productRepository.js";
import { findAllScenarios, findScenarioBySelection, findScenarioBySlug } from "../repositories/scenarioRepository.js";
import type { Product } from "../types/product.js";
import type { ResolvedScenario, Room, Scenario, ScenarioSummary, UserNeed } from "../types/scenario.js";

export function listScenarioSummaries(): ScenarioSummary[] {
  return findAllScenarios().map(({ slug, room, element, need, title, summary }) => ({
    slug, room, element, need, title, summary,
  }));
}

export function getResolvedScenarioBySlug(slug: string): ResolvedScenario | undefined {
  const scenario = findScenarioBySlug(slug);
  return scenario ? resolveScenario(scenario, findAllProducts()) : undefined;
}

export function getRecommendation(room: Room, need: UserNeed): ResolvedScenario | undefined {
  const scenario = findScenarioBySelection(room, need);
  return scenario ? resolveScenario(scenario, findAllProducts()) : undefined;
}

export function resolveScenario(scenario: Scenario, products: readonly Product[]): ResolvedScenario {
  const resolveProduct = (productId: string) => {
    const product = products.find((candidate) => candidate.id === productId);
    if (!product) throw new Error(`Scenario ${scenario.slug} references missing product ${productId}.`);
    return product;
  };
  const layers = scenario.layers.map(({ productIds, ...layer }) => ({
    ...layer,
    products: productIds.map(resolveProduct),
  }));
  const recommendations = scenario.recommendations.map((recommendation) => {
    return { product: resolveProduct(recommendation.productId), reason: recommendation.reason };
  });

  return { ...scenario, layers, recommendations };
}
