<template>
  <h2 class="font-bold text-2xl text-center text-slate-800 p-2">
    Pack die Melone ins Auto!
  </h2>
  <div class="flex flex-col gap-1 bg-white p-2" v-if="playGrid">
    <!-- Render the grid rows -->
    <div v-for="(row, rowIndex) in playGrid" :key="rowIndex" class="flex flex-row gap-1">
      <div
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        class="bg-white p-1 min-h-32 min-w-32 w-32 h-32"
        @dragover.prevent
        @drop="onDrop($event, rowIndex, colIndex)"
      >
        <div
          v-if="playGrid[rowIndex][colIndex].card"
          class="card flex bg-slate-200 shadow-md w-full h-full justify-center items-center"
          :style="
            playGrid[rowIndex][colIndex].is_being_dragged
              ? 'transform: translateX(-9999px); transition: 0.01s; background-color: transparent'
              : ''
          "
          :draggable="
            playGrid[rowIndex][colIndex].card.item.affordances.includes('movable')
          "
          @dragstart="onDragStart($event, rowIndex, colIndex)"
          @dragend="playGrid[rowIndex][colIndex].is_being_dragged = false"
        >
          <!-- this can later be extended into rendering the whole array of images, so img can be added -->
          <!-- class="object-contain w-24 h-24 absolute" -->

          <img
            v-for="img of playGrid[rowIndex][colIndex].card.images"
            :key="img.name"
            :src="'/assets/items/' + img.name + '.webp'"
            class="object-contain w-4 h-4 absolute"
            :style="getImageStyle(img)"
            alt=""
            draggable="false"
          />
          <small class="text-black" v-for="key in getKeysInContext(cell)">
            {{ key }}
          </small>
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
  scale?: number;
  offset?: [number, number];
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
    key: val["primary_key"],
    images: val["images"],
    affordances: val["affordances"] || [],
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

const currentLevel = ref(levels[2]);
const playGrid: Ref<Grid | null> = ref(null);
const itemKeyCount: { [key: string]: number } = {};

function generateGrid() {
  let level = currentLevel.value;
  let grid: Grid = [];
  for (let _row of level.initialGrid) {
    const row: Field[] = [];
    for (let _cell of _row) {
      if (_cell.length > 0) {
        const randomItemKey = _cell[Math.floor(Math.random() * _cell.length)];
        const item = items[randomItemKey];

        if (item.key in itemKeyCount) {
          itemKeyCount[item.key] += 1;
        } else {
          itemKeyCount[item.key] = 1;
        }

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

function getImageStyle(img: CardImage): string {
  if (img.scale != undefined && img.offset != undefined) {
    // TODO: everything after 1st is randomly ignored xD
    return `transform: scale(${img.scale}); left: ${img.offset[0]} px; top: ${img.offset[1]} px;`;
  } else {
    return "";
  }
}

function onDrop(event, row, col) {
  playGrid.value![dragOrigin[0]][dragOrigin[1]].is_being_dragged = false;

  // allow just placing on empty fields
  if (playGrid.value![row][col].card == null) {
    playGrid.value![dragOrigin[0]][dragOrigin[1]] = {
      card: null,
      is_being_dragged: false,
    };
    playGrid.value![row][col].card = draggedCard;
  }
  // ALCHEMY
  else {
    const card_sending = playGrid.value![dragOrigin[0]][dragOrigin[1]].card;
    const card_receiving = playGrid.value![row][col].card;

    // cutting
    if (
      card_sending?.item.affordances.includes("cuts") &&
      card_receiving.item.affordances.includes("cuttable")
    ) {
      const newItemName = card_receiving.item.loadWhenCut;
      if (newItemName != null) {
        const newItem = items[newItemName];

        playGrid.value![row][col].card = {
          item: newItem,
          images: [
            {
              name: newItem.images[0],
              zIndex: 0,
            },
          ],
        };
      }
    }
    // storage
    // (simply kill stored items)
    if (card_sending?.item.affordances.includes("storable-medium")) {
      // test if it fits
      if (card_receiving.item.affordances.includes("storage-medium")) {
        playGrid.value![dragOrigin[0]][dragOrigin[1]] = {
          card: null,
          is_being_dragged: false,
        };
      }
    }
    if (card_sending?.item.affordances.includes("storable-small")) {
      // test if it fits
      if (
        card_receiving.item.affordances.includes("storage-medium") ||
        card_receiving.item.affordances.includes("storage-small")
      ) {
        playGrid.value![dragOrigin[0]][dragOrigin[1]] = {
          card: null,
          is_being_dragged: false,
        };
      }
    }
    // park
    if (card_sending?.item.affordances.includes("parkable")) {
      // test if it fits
      if (card_receiving.item.affordances.includes("is-parking-space")) {
        card_receiving.images.push({
          name: card_sending.item.images[0],
          zIndex: 1,
          scale: 0.43,
          offset: [Math.random() * -40 + 20, Math.random() * -40 + 20],
        });
        playGrid.value![dragOrigin[0]][dragOrigin[1]] = {
          card: null,
          is_being_dragged: false,
        };
      }
    }
  }
}

// keys, actions, quests

function getKeysInContext(cell: Field) {
  const item = cell.card?.item;

  // main
  let mainKey = item.key;
  if (itemKeyCount[mainKey] > 1) {
    mainKey = "A__" + mainKey;
  } else {
    mainKey = "THE__" + mainKey;
  }

  mainKey = mainKey.toUpperCase()

  return [mainKey];
}
</script>
