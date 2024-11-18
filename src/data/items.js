// items.js
export default {
    "kiwi": { primary_key: "kiwi", secondary_keys: [], images: ["kiwi_uncut"], affordances: ["cuttable", "movable"], load_when_cut: "kiwi-cut" },
    "knife": { primary_key: "knife", secondary_keys: [], images: ["knife"], affordances: ["cuts", "movable"] },
    "kiwi-cut": { primary_key: "kiwi-halves", secondary_keys: [], images: ["kiwi_cut"], affordances: ["movable"] },
    "car-black": { primary_key: "car", secondary_keys: [], images: ["car_black-Photoroom"], affordances: ["storage-medium"], color: "black" },
    "car-blue": { primary_key: "car", secondary_keys: [], images: ["car_blue_bmw_crop", "car_blue-Photoroom"], affordances: ["storage-medium"], color: "blue" },
    "car-green": { primary_key: "car", secondary_keys: [], images: ["car_green-Photoroom"], affordances: ["storage-medium"], color: "green" },
    "fan": { primary_key: "fan", secondary_keys: [], images: ["fan_crop"], affordances: ["storable-medium", "movable"] },
    "globe": { primary_key: "glob", secondary_keys: [], images: ["globe_crop"], affordances: ["storable-medium", "movable"] },
    "potted-plant": { primary_key: "potted-plant", secondary_keys: [], images: ["pot_plant_crop"], affordances: ["storable-medium", "movable"] },
    "suitcase-white": { primary_key: "suitcase", secondary_keys: [], images: ["suitcas2_crop"], affordances: ["storable-medium", "movable", "storage-small"] },
    "suitcase-blue": { primary_key: "suitcase", secondary_keys: [], images: ["suitcase1_crop"], affordances: ["storable-medium", "movable", "storage-small"] },
    "melon": { primary_key: "melon", secondary_keys: [], images: ["melon_whole"], affordances: ["storable-small", "movable"] },
};
