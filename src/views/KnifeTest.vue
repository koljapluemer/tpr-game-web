<template>
  <div class="flex flex-col gap-1 bg-slate-200 p-8">
    <!-- Render the grid rows -->
    <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="flex flex-row gap-1">
      <div
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        class="min-w-32 bg-white p-1 min-h-32 "
        @dragover.prevent
        @drop="onDrop($event, rowIndex, colIndex)"
      >
        <!-- Render items in the cell -->
        <!-- :style="{ backgroundImage: `url(${items[itemKey]?.images[0] || ''})` }" -->

        <div
          v-if="cell.length > 0"
          class="card p-4 bg-slate-200 shadow-md w-full h-full"
          draggable="true"
          @dragstart="onDragStart($event, cell[0], rowIndex, colIndex)"
        >
          {{ cell[0] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import levelTemplates from "../data/levelTemplates.js";
import items from "../data/items.js";

// Reactive state
const grid = ref([]); // The grid structure
const draggedItem = ref(null); // The currently dragged item's key
const draggedFrom = ref({ row: null, col: null }); // The original position of the dragged item

// Initialize the game by selecting a random level and generating the grid
function initializeGame() {
  const randomLevel = levelTemplates[Math.floor(Math.random() * levelTemplates.length)];
  // Deep clone the level's grid to avoid mutating the template
  grid.value = randomLevel.grid.map((row) => row.map((cell) => [...cell]));
}

// Handle the start of a drag operation
function onDragStart(event, itemKey, row, col) {
  draggedItem.value = itemKey;
  draggedFrom.value = { row, col };
}

// Handle the drop event
function onDrop(event, row, col) {
  if (!draggedItem.value) return;

  const targetCell = grid.value[row][col];
  const draggedItemData = items[draggedItem.value];

  // Check if there's an item in the target cell
  if (targetCell.length > 0) {
    const targetItemKey = targetCell[0];
    const targetItemData = items[targetItemKey];

    // Handle affordance logic: "cuts" vs "cuttable"
    if (
      draggedItemData.affordances === "cuts" &&
      targetItemData.affordances === "cuttable"
    ) {
      targetCell[0] = targetItemData.load_when_cut; // Replace target with "cut" version
      grid.value[draggedFrom.value.row][draggedFrom.value.col].push(draggedItem.value); // Return the dragged item to its original position
      resetDragState();
      return;
    }
  }

  // Default behavior: Move the dragged item to an empty cell
  if (targetCell.length === 0) {
    targetCell.push(draggedItem.value); // Add the dragged item to the target cell
    const originCell = grid.value[draggedFrom.value.row][draggedFrom.value.col];
    const index = originCell.indexOf(draggedItem.value);
    if (index > -1) originCell.splice(index, 1); // Remove the item from its original cell
  }

  resetDragState();
}

// Reset drag state after a drag-and-drop operation
function resetDragState() {
  draggedItem.value = null;
  draggedFrom.value = { row: null, col: null };
}

// Initialize the game when the component is mounted
initializeGame();
</script>
