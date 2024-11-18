import { Level } from "./types";
import { items } from "./items";

export const levels: Record<string, Level> = {
  level1: {
    id: "cut-fruit-1",
    format: [3, 3],
    initialGrid: [
      [items.knife, null, items.kiwi ],
      [null, null, null]
    ],
    prerequisites: [],
  },
};
