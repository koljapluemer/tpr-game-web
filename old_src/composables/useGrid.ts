// src/composables/useGrid.ts
import { ref } from "vue";
import { Grid, Card, Item, Position, Level, Field } from "../types";
import { items } from "../items";

export function useGrid(level: Level) {
  // Initialize a reactive grid
  //   const grid = ref<Grid>(createInitialGrid());
  const grid = ref<Grid>(createGridForLevel(level));

  // Function to create the initial grid
  function createInitialGrid(): Grid {
    return [
      [{ card: createCard(items.sword) }, { card: null }, { card: null }],
      [{ card: null }, { card: createCard(items.shield) }, { card: null }],
      [{ card: null }, { card: null }, { card: createCard(items.potion) }],
    ];
  }

  function createGridForLevel(level: Level): Grid {
    let grid: Grid = [];
    console.log('using level', level)
    for (var _row of level.initialGrid) {
      console.log("looping");
      let row: Field[] = [];
      for (var _cell of _row) {
        let field: Field;
        if (_cell == null) {
          field = { card: null };
        } else {
          console.log("creating cell");
          field = {
            card: createCard(_cell),
          };
        }
        row.push(field);
      }
      grid.push(row);
    }
    return grid;
  }

  // Helper to create a card
  function createCard(item: Item): Card {
    return {
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
