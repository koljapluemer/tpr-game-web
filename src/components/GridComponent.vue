<!-- src/components/GridComponent.vue -->
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
          @dragover.prevent
          @drop="onDrop($event, { x, y })"
        >
          <div
            v-if="field.card"
            class="card"
            :draggable="true"
            @dragstart="onDragStart($event, { x, y })"
          >
            {{ field.card.item.title }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useGrid } from "../composables/useGrid";
  import { Position } from "../types";
  
  // Use the grid composable
  const { grid, moveCard } = useGrid();
  
  // Handle drag start event
  function onDragStart(event: DragEvent, from: Position) {
    event.dataTransfer?.setData("application/json", JSON.stringify(from));
  }
  
  // Handle drop event
  function onDrop(event: DragEvent, to: Position) {
    const data = event.dataTransfer?.getData("application/json");
    if (data) {
      const from: Position = JSON.parse(data);
      moveCard(from, to);
    }
  }
  </script>
  
  <style scoped>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    gap: 8px;
  }
  .row {
    display: flex;
  }
  .field {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    position: relative;
  }
  .card {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;
  }
  </style>
  