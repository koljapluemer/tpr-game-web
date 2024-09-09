<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import leaflet from "leaflet";
import { onMounted, watchEffect } from "vue";
import { useMainStore } from '@/stores/main'
const main = useMainStore()

let map: leaflet.Map;

onMounted(() => {
  // default view is either main.homeMarker or new york
  let defaultView = [40.73061, -73.935242];
  if (!(main.homeMarker.latitude == 0 && main.homeMarker.longitude == 0)) {
    console.log("setting default view to home marker");
    defaultView = [main.homeMarker.latitude, main.homeMarker.longitude];
  }


  map = leaflet.map("map").setView(defaultView, 13);

  leaflet
    .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map);

  //   if main.homeMarker set, add to map
  if (main.homeMarker) {
    leaflet.marker([main.homeMarker.latitude, main.homeMarker.longitude]).addTo(map);
  }

  map.addEventListener("click", (e) => {
    const { lat: latitude, lng: longitude } = e.latlng;

    leaflet
      .marker([latitude, longitude])
      .addTo(map)
      .bindPopup(
        `Saved Marker at (<strong>${latitude.toFixed(2)},${longitude.toFixed(
          2
        )}</strong>)`
      );

    //   if previous home marker, remove
    if (main.homeMarker) {
      console.log("removing home marker");
      map.removeLayer(main.homeMarker);
      // reset saved distances
      main.generatedLocations = {};
      location.reload();
    }

    main.homeMarker = { latitude, longitude };
    console.log("home marker set to", main.homeMarker);
  });
});



</script>

<style scoped>
#map {
  width: 100%;
  height: max(80vh, 500px);
}
</style>
