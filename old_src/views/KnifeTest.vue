<template>

<GridComponent :level="currentLevel" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import GridComponent from "../components/GridComponent.vue";

import { levels } from "../levels";

let currentLevel = levels['level1']

</script>

