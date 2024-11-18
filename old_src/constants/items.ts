export const items = {
    knife: { id: "knife", title: "Knife" },
    kiwi: { id: "kiwi", title: "Kiwi" },
  } as const;
  
  export type ItemID = keyof typeof items;
  