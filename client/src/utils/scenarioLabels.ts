import type { BuildingElement, Room, UserNeed } from "../types/scenario";

export const roomLabels: Record<Room, string> = {
  bedroom: "Bedroom",
  bathroom: "Bathroom",
};

export const roomDescriptions: Record<Room, string> = {
  bedroom: "Explore comfort needs for a bedroom interior wall",
  bathroom: "Explore a wall for a moisture-prone space",
};

export const userNeedLabels: Record<UserNeed, string> = {
  "reduce-noise": "Reduce noise between spaces",
  "manage-moisture": "Manage moisture",
  "improve-thermal-comfort": "Improve thermal comfort",
};

export const buildingElementLabels: Record<BuildingElement, string> = {
  "interior-wall": "Interior wall",
};
