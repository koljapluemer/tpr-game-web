<template></template>

<script setup lang="ts">
import { ref } from "vue";

import levelTemplates from "../data/levelTemplates.js";
import itemTemplates from "../data/items.js";

export interface Item {
  key: string;
  images: string[];
  affordances: string[];
  loadWhenCut: string | null;
}

export interface CardImage {
  name: string;
  zIndex: number;
}

// Card interface with mutable state
export interface Card {
  item: Item;
  images: CardImage[];
}

// Field that may contain a card
export interface Field {
  card: Card | null;
}

// 2D Grid composed of fields
export type Grid = Field[][];

export interface Level {
  id: string; // Unique identifier for the level
  initialGrid: string[][][];
  format: [number, number];
  prerequisites: string[]; // List of level IDs that must be completed before playing this level
}

const items: { [key: string]: Item } = {};
const levels: Level[] = [];

for (var key in itemTemplates) {
  let val = itemTemplates[key];
  let item: Item = {
    key: key,
    images: val["images"],
    affordances: val["affordances"],
    loadWhenCut: val["load_when_cut"],
  };
  items[key] = item;
}

for (var key in levelTemplates) {
  let val = levelTemplates[key];
  let nr_of_rows = val["grid"].length;
  let nr_of_cols = val["grid"][0].length;
  let level: Level = {
    id: key,
    initialGrid: val["grid"],
    prerequisites: val["prerequisites"],
    format: [nr_of_rows, nr_of_cols],
  };
  levels.push(level);
}

const currentLevel = ref(levels[0]);
const playGrid = ref({});

function generateGrid() {
  let level = currentLevel.value;
  let grid: Grid = [];
  for (let _row of level.initialGrid) {
    const row: Field[] = [];
    for (let _cell of _row) {
      if (_cell.length > 0) {
        const randomItemKey = _cell[Math.floor(Math.random() * _cell.length)];
        const item = items[randomItemKey];
        const randomItemImg = item.images[Math.floor(Math.random() * item.images.length)];
        row.push({
          card: {
            item: item,
            images: [
              {
                name: randomItemImg,
                zIndex: 0,
              },
            ],
          },
        });
      } else {
        row.push({
          card: null,
        });
      }
    }
    grid.push(row)
  }

  playGrid.value = grid;
}

generateGrid()
</script>
