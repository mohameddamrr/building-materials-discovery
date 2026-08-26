export interface SolutionPhoto {
  alt: string;
  src: string;
}

const scenarioPhotos: Record<string, SolutionPhoto> = {
  "bedroom-quieter-interior-wall": {
    alt: "Serene modern bedroom with an acoustic feature wall",
    src: "/images/generated/noise-solution-hero-v2.jpg",
  },
  "bedroom-thermal-comfort-interior-wall": {
    alt: "Warm modern bedroom designed around thermal comfort",
    src: "/images/generated/thermal-solution-hero-v2.jpg",
  },
  "bathroom-moisture-aware-interior-wall": {
    alt: "Modern bathroom with carefully detailed shower walls",
    src: "/images/generated/moisture-solution-hero-v2.jpg",
  },
};

export const layerPhotos: Record<string, SolutionPhoto> = {
  "bathroom-facing-board": { alt: "Generic green-faced moisture-conscious gypsum board", src: "/images/generated/moisture-board-product-v2.jpg" },
  "bedroom-facing-board": { alt: "Generic blue-gray acoustic lining board", src: "/images/generated/acoustic-board-product-v2.jpg" },
  "board-joint-finish": { alt: "Generic joint compound and drywall finishing knife", src: "/images/generated/joint-compound-product-v2.jpg" },
  "metal-frame": { alt: "Metal studs and floor track used to form an interior wall frame", src: "/images/generated/wall-stud-product-v2.jpg" },
  "opposite-side-board": { alt: "Generic standard gypsum board with its cut core visible", src: "/images/generated/standard-board-product-v2.jpg" },
  "thermal-cavity-insulation": { alt: "Golden glass-wool insulation material in roll and batt form", src: "/images/generated/thermal-insulation-product-v2.jpg" },
  "wall-cavity-insulation": { alt: "Dense acoustic mineral-wool insulation slabs", src: "/images/generated/acoustic-insulation-product-v2.jpg" },
};

const fallbackScenarioPhoto: SolutionPhoto = {
  alt: "Conceptual interior wall with board, framing and insulation layers",
  src: "/images/generated/wall-system-v2.jpg",
};

export function getScenarioPhoto(slug: string) {
  return scenarioPhotos[slug] ?? fallbackScenarioPhoto;
}
