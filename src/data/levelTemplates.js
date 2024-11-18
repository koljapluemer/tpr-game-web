// levelTemplates.js

const thingsThatFitInCar = ["fan", "globe", "potted-plant", "suitcase-white", "suitcase-blue", "melon"]
const colorfulCars = ["car-black", "car-blue", "car-green"]

export default
  {
    "cut-fruit-1": {
      grid: [
        [["kiwi"], ["knife"]],
        [[], []],
      ],
      prerequisites: [],
    },
    "pack-car-x": {
      grid: [
        [[], colorfulCars, colorfulCars, []],
        [thingsThatFitInCar, thingsThatFitInCar, thingsThatFitInCar, thingsThatFitInCar]
      ]
    },
    "park-car-x" : {
      grid: [
        [[], ["parking-lot"], []],
        [["parking-lot"], ["house"], ["parking-lot"]],
        [["car-old-movable"], ["parking-lot"], []],
      ]
    }
  };
