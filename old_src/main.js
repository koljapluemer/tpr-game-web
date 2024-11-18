import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


import "vue3-openlayers/styles.css";
import OpenLayersMap from "vue3-openlayers";

createApp(App).use(router).use(OpenLayersMap /*, options */).use(pinia).mount('#app')