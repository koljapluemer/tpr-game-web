export interface Item {
    id: string;
    title: string;
  }
  
  export interface Card {
    id: string;
    item: Item;
    state: {
      selected: boolean;
      highlighted: boolean;
    };
  }
  
  export interface Field {
    card: Card | null;
  }
  
  export type Grid = Field[][];
  