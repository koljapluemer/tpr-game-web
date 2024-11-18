<template>

<GridComponent />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GridComponent from "../components/GridComponent.vue";

export default defineComponent({
  name: "App",
  components: {
    GridComponent,
  },
});
</script>