
// Immutable item interface
export interface Item {
    id: string;
    title: string;
  }
  
  // Card interface with mutable state
  export interface Card {
    item: Item;
    state: {
      selected: boolean;
      highlighted: boolean;
    };
  }
  
  // Field that may contain a card
  export interface Field {
    card: Card | null;
  }
  
  // 2D Grid composed of fields
  export type Grid = Field[][];
  
  // Position in the grid
  export interface Position {
    x: number;
    y: number;
  }

  
  
  export interface Level {
    id: string; // Unique identifier for the level
    initialGrid: (Item | null )[][];
    format: [number, number];
    prerequisites: string[]; // List of level IDs that must be completed before playing this level
  }
  