export const productCategories = ["boards", "insulation", "framing", "finishing"] as const;
export type ProductCategory = (typeof productCategories)[number];

export const productApplications = ["interior-walls"] as const;
export type ProductApplication = (typeof productApplications)[number];

export const performanceNeeds = [
  "noise-reduction",
  "moisture-resistance",
  "thermal-comfort",
] as const;
export type PerformanceNeed = (typeof performanceNeeds)[number];

export type ProductSource = { type: "fictional" } | { type: "public-source"; url: string };

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  applications: ProductApplication[];
  performanceNeeds: PerformanceNeed[];
  tags: string[];
  keyFeatures: string[];
  source: ProductSource;
}

export interface ProductQuery {
  q?: string;
  category?: ProductCategory;
  need?: PerformanceNeed;
}
