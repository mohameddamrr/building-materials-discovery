import type { ProductCategory } from "../../types/product";
import type { Room } from "../../types/scenario";

export interface SolutionPhoto {
  alt: string;
  credit: string;
  href: string;
  src: string;
}

const boardPhoto: SolutionPhoto = {
  alt: "Stacks of generic drywall sheets being delivered to a construction site",
  credit: "KeepOnTruckin, CC BY-SA 3.0",
  href: "https://commons.wikimedia.org/wiki/File:Drywall_material_handler.jpg",
  src: "/images/materials/gypsum-board-wall.jpg",
};

const bedroomBoardPhoto: SolutionPhoto = {
  alt: "Drywall sheets and hand tools prepared for installation",
  credit: "Timothyjosephwood, CC BY-SA 4.0",
  href: "https://commons.wikimedia.org/wiki/File:Drywall_and_tools.jpg",
  src: "/images/materials/drywall-tools.jpg",
};

const oppositeBoardPhoto: SolutionPhoto = {
  alt: "A partially finished gypsum wall with framing and cables visible",
  credit: "Sambach, CC BY-SA 2.5",
  href: "https://commons.wikimedia.org/wiki/File:Gypsum_wall.jpg",
  src: "/images/materials/gypsum-wall-detail.jpg",
};

const insulationPhoto: SolutionPhoto = {
  alt: "Close-up of yellow fibrous glass-wool insulation material",
  credit: "Typisch, CC BY-SA 3.0",
  href: "https://commons.wikimedia.org/wiki/File:Glaswolle.JPG",
  src: "/images/materials/glass-wool-insulation.jpg",
};

const framingPhoto: SolutionPhoto = {
  alt: "Metal studs and floor track being assembled before wall lining is attached",
  credit: "Matthew Noles / U.S. Navy, public domain",
  href: "https://commons.wikimedia.org/wiki/File:Metal_Framing_(9020041).jpg",
  src: "/images/materials/metal-framing.jpg",
};

const finishingPhoto: SolutionPhoto = {
  alt: "Workers applying joint treatment along visible seams between drywall boards",
  credit: "MTA Capital Construction, CC BY 2.0",
  href: "https://commons.wikimedia.org/wiki/File:Taping_gypsum_board_seams_in_back_of_house_rooms_in_the_new_LIRR_passenger_concourse_in_preparation_for_painting_and_final_finishes._4-17-19_(47645209441).jpg",
  src: "/images/materials/joint-finishing.jpg",
};

export const roomPhotos: Record<Room, SolutionPhoto> = {
  bedroom: {
    alt: "A calm bedroom with a bed positioned beside an interior wall",
    credit: "Get Lost Mike / Pexels",
    href: "https://www.pexels.com/photo/bedroom-interior-with-a-bed-near-a-wall-12485856/",
    src: "/images/materials/bedroom-context.jpg",
  },
  bathroom: {
    alt: "A contemporary bathroom interior with tiled wall surfaces",
    credit: "Max Vakhtbovych / Pexels",
    href: "https://www.pexels.com/photo/interior-of-modern-bathroom-5998120/",
    src: "/images/materials/bathroom-context.jpg",
  },
};

export const layerPhotos: Record<string, SolutionPhoto> = {
  "bathroom-facing-board": boardPhoto,
  "bedroom-facing-board": bedroomBoardPhoto,
  "board-joint-finish": finishingPhoto,
  "metal-frame": framingPhoto,
  "opposite-side-board": oppositeBoardPhoto,
  "thermal-cavity-insulation": insulationPhoto,
  "wall-cavity-insulation": insulationPhoto,
};

export const categoryPhotos: Record<ProductCategory, SolutionPhoto> = {
  boards: boardPhoto,
  finishing: finishingPhoto,
  framing: framingPhoto,
  insulation: insulationPhoto,
};
