<template>
  <div class="flex flex-col gap-1 bg-slate-200 p-8" v-if="playGrid">
    <!-- Render the grid rows -->
    <div v-for="(row, rowIndex) in playGrid" :key="rowIndex" class="flex flex-row gap-1">
      <div
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        class="bg-white p-1 min-h-32 min-w-32 w-32 h-32"
        @dragover.prevent
        @drop="onDrop($event, rowIndex, colIndex)"
      >
        <!-- @dragStart="" -->

        <div
          v-if="playGrid[rowIndex][colIndex].card"
          class="card flex bg-slate-200 shadow-md w-full h-full justify-center align-center"
          :style="playGrid[rowIndex][colIndex].is_being_dragged ? 'transform: translateX(-9999px); transition: 0.01s' : '' "
          draggable="true"
          @dragstart="onDragStart($event, rowIndex, colIndex)"
          @dragend="playGrid[rowIndex][colIndex].is_being_dragged = false"
        >
          <!-- this can later be extended into rendering the whole array of images, so img can be added -->
          <img
            :src="
              '/assets/items/' +
              playGrid[rowIndex][colIndex].card.images[0].name +
              '.webp'
            "
            class="object-contain w-24 h-24"
            alt=""
            draggable="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";

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
  is_being_dragged: boolean;
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
const playGrid: Ref<Grid | null> = ref(null);

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
          is_being_dragged: false,
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
          is_being_dragged: false,
        });
      }
    }
    grid.push(row);
  }

  playGrid.value = grid;
}

generateGrid();

// D & D

let draggedCard: Card | null = null;
let dragOrigin = [-1, -1];

function onDragStart(event, row, col) {
  // event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";

  draggedCard = playGrid.value![row][col].card;
  playGrid.value![row][col].is_being_dragged = true;
  dragOrigin = [row, col];
}

function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

function onDrop(event, row, col) {
  console.log("on drop");
  playGrid.value![dragOrigin[0]][dragOrigin[1]].is_being_dragged = false;

  playGrid.value![dragOrigin[0]][dragOrigin[1]] = { card: null, is_being_dragged: false };
  if (isNotNull(draggedCard)) {
    playGrid.value![row][col].card = draggedCard;
  }
}
</script>
