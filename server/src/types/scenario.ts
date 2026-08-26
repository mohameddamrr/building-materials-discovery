import type { Product } from "./product.js";

export const rooms = ["bedroom", "bathroom"] as const;
export type Room = (typeof rooms)[number];

export const buildingElements = ["interior-wall"] as const;
export type BuildingElement = (typeof buildingElements)[number];

export const userNeeds = ["reduce-noise", "manage-moisture", "improve-thermal-comfort"] as const;
export type UserNeed = (typeof userNeeds)[number];

export interface ConstructionLayer {
  id: string;
  name: string;
  materialRole: string;
  explanation: string;
  productIds: string[];
}

export interface ScenarioRecommendation {
  productId: string;
  reason: string;
}

export interface Scenario {
  id: string;
  slug: string;
  room: Room;
  element: BuildingElement;
  need: UserNeed;
  title: string;
  summary: string;
  performancePriorities: string[];
  layers: ConstructionLayer[];
  recommendations: ScenarioRecommendation[];
}

export type ScenarioSummary = Pick<Scenario, "slug" | "room" | "element" | "need" | "title" | "summary">;

export interface ResolvedRecommendation {
  product: Product;
  reason: string;
}

export type ResolvedConstructionLayer = Omit<ConstructionLayer, "productIds"> & { products: Product[] };

export type ResolvedScenario = Omit<Scenario, "layers" | "recommendations"> & {
  layers: ResolvedConstructionLayer[];
  recommendations: ResolvedRecommendation[];
};
