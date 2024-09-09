<template>

  <div id="map"></div>
</template>

<script setup lang="ts">
import leaflet from "leaflet";
import { onMounted, watchEffect } from "vue";


let map: leaflet.Map;

import { ref } from "vue";

import randomLocation from "random-location";
import { useMainStore } from '@/stores/main'
const main = useMainStore()

const options = [
  { label: "Short Walk", value: 0.5 },
  { label: "Long Walk", value: 2 },
  { label: "Hike", value: 7 },
];



function getRandomCoord() {

  // store has a generatedLocations{}
  // it stores a distance as key, and an object as value with lat, long, and date
  // if key of todays day does not exist, or date for that key is not today, regenerate:
  let regenerate_location = false;
  if (!main.generatedLocations[main.distance]) {
    console.log('no generated location for this distance')
    regenerate_location = true;
  } else if (main.generatedLocations[main.distance].date != new Date().toLocaleDateString()) {
    console.log('generated location is not from today')
    regenerate_location = true;
  }

  if (regenerate_location) {
    console.log('regenerating location')
    const randomPoint = randomLocation.randomCirclePoint(
      { latitude: main.homeMarker.latitude, longitude: main.homeMarker.longitude },
      main.distance * 1000
    );
    main.generatedLocations[main.distance] = {
      latitude: randomPoint.latitude,
      longitude: randomPoint.longitude,
      date: new Date().toLocaleDateString()
    }
  }

  return main.generatedLocations[main.distance];



}

onMounted(() => {
  if (main.homeMarker.latitude == 0 && main.homeMarker.longitude == 0) {
    // redirect to home page
    location.href = "/";
  }

  map = leaflet
    .map("map")
    .setView([main.homeMarker.latitude, main.homeMarker.longitude], 13);

  leaflet
    .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map);

  const markerCoords = getRandomCoord();
  // create marker
  leaflet
    .marker([
      markerCoords.latitude,
      markerCoords.longitude,
    ])
    .addTo(map)
    .bindPopup(
      `Destination Marker at (<strong>${markerCoords.latitude.toFixed(
        2
      )},${markerCoords.longitude.toFixed(2)}</strong>)`
    );
});
</script>

<style scoped>
#map {
  width: 100%;
  height: max(80vh, 500px);
}
</style>
