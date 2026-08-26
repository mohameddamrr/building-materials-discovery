export const productCategories = ["boards", "insulation", "framing", "finishing"] as const;
export type ProductCategory = (typeof productCategories)[number];

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
  applications: "interior-walls"[];
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

export interface ProductsResponse {
  products: Product[];
  total: number;
}

export interface ProductResponse {
  product: Product;
}

