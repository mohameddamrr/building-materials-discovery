import type { Product } from "./product";

export type Room = "bedroom" | "bathroom";
export type BuildingElement = "interior-wall";
export type UserNeed = "reduce-noise" | "manage-moisture" | "improve-thermal-comfort";

export interface ScenarioSummary {
  slug: string;
  room: Room;
  element: BuildingElement;
  need: UserNeed;
  title: string;
  summary: string;
}

export interface ResolvedConstructionLayer {
  id: string;
  name: string;
  materialRole: string;
  explanation: string;
  products: Product[];
}

export interface ResolvedRecommendation {
  product: Product;
  reason: string;
}

export interface ResolvedScenario extends ScenarioSummary {
  id: string;
  performancePriorities: string[];
  layers: ResolvedConstructionLayer[];
  recommendations: ResolvedRecommendation[];
}

