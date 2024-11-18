<script setup lang="ts">


import { ref } from "vue";
// import { items, Card, Grid } from "./types";

import { computed } from "vue";
// import { useGrid } from "./useGrid";

// An immutable item
interface Item {
  id: string;
  title: string;
}

// A card that holds an item and has mutable state
interface Card {
  id: string;
  item: Item;
  state: {
    selected: boolean;
    highlighted: boolean;
  };
}

// A field on the grid that may or may not hold a card
interface Field {
  card: Card | null;
}

// The grid is a 2D array of fields
type Grid = Field[][];

const items: Record<string, Item> = {
  sword: { id: "sword", title: "Sword" },
  shield: { id: "shield", title: "Shield" },
  potion: { id: "potion", title: "Potion" },
};



// Initialize a 3x3 grid with some cards
function useGrid() {
  const grid = ref<Grid>([
    [{ card: { id: "1", item: items.sword, state: { selected: false, highlighted: false } } }, { card: null }, { card: null }],
    [{ card: null }, { card: { id: "2", item: items.shield, state: { selected: false, highlighted: false } } }, { card: null }],
    [{ card: null }, { card: null }, { card: { id: "3", item: items.potion, state: { selected: false, highlighted: false } } }],
  ]);

  // Function to move a card between fields
  function moveCard(fromX: number, fromY: number, toX: number, toY: number) {
    const fromField = grid.value[fromY][fromX];
    const toField = grid.value[toY][toX];

    if (fromField.card && !toField.card) {
      toField.card = fromField.card;
      fromField.card = null;
    }
  }

  return { grid, moveCard };
}



// Access the grid state
const { grid, moveCard } = useGrid();

// Handle drag-and-drop events
function onDragStart(event: DragEvent, fromX: number, fromY: number) {
  event.dataTransfer!.dropEffect = 'move';
  event.dataTransfer!.effectAllowed = 'move';
  event.dataTransfer?.setData("from", JSON.stringify({ fromX, fromY }));
}

function onDrop(event: DragEvent, toX: number, toY: number) {
  const fromData = event.dataTransfer?.getData("from");
  if (fromData) {
    const { fromX, fromY } = JSON.parse(fromData);
    moveCard(fromX, fromY, toX, toY);
  }
}

function onDragOver(event: DragEvent) {
  event.preventDefault(); // Allow dropping
}
</script>

<template>
  <div class="grid">
    <div
      v-for="(row, y) in grid"
      :key="y"
      class="row"
    >
      <div
        v-for="(field, x) in row"
        :key="x"
        class="field"
        @dragover="onDragOver"
        @drop="(event) => onDrop(event, x, y)"
      >
        <div
          v-if="field.card"
          class="card"
          draggable="true"
          @dragstart="(event) => onDragStart(event, x, y)"
        >
          {{ field.card.item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.grid {
  display: grid;
  gap: 8px;
}
.row {
  display: flex;
}
.field {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
}
.card {
  padding: 8px;
  background-color: #fff;
  border: 1px solid #000;
  cursor: grab;
}
</style>
