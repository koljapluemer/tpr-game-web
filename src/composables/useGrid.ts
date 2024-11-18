// src/composables/useGrid.ts
import { ref } from "vue";
import { Grid, Card, Item, Position } from "../types";
import { items } from "../items";

export function useGrid() {
  // Initialize a reactive grid
  const grid = ref<Grid>(createInitialGrid());

  // Function to create the initial grid
  function createInitialGrid(): Grid {
    return [
      [
        { card: createCard("1", items.sword) },
        { card: null },
        { card: null },
      ],
      [
        { card: null },
        { card: createCard("2", items.shield) },
        { card: null },
      ],
      [
        { card: null },
        { card: null },
        { card: createCard("3", items.potion) },
      ],
    ];
  }

  // Helper to create a card
  function createCard(id: string, item: Item): Card {
    return {
      id,
      item,
      state: {
        selected: false,
        highlighted: false,
      },
    };
  }

  // Move a card from one position to another
  function moveCard(from: Position, to: Position) {
    const fromField = grid.value[from.y][from.x];
    const toField = grid.value[to.y][to.x];

    if (fromField.card && !toField.card) {
      toField.card = fromField.card;
      fromField.card = null;
    }
  }

  return {
    grid,
    moveCard,
  };
}
