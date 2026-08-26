import type { PerformanceNeed, ProductCategory } from "../types/product";

export const categoryLabels: Record<ProductCategory, string> = {
  boards: "Boards",
  insulation: "Insulation",
  framing: "Framing",
  finishing: "Finishing",
};

export const performanceNeedLabels: Record<PerformanceNeed, string> = {
  "noise-reduction": "Noise reduction",
  "moisture-resistance": "Moisture resistance",
  "thermal-comfort": "Thermal comfort",
};

export const applicationLabels = {
  "interior-walls": "Interior walls",
} as const;

