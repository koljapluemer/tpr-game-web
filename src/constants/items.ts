export const items = {
    sword: { id: "sword", title: "Sword" },
    shield: { id: "shield", title: "Shield" },
    potion: { id: "potion", title: "Potion" },
  } as const;
  
  export type ItemID = keyof typeof items;
  