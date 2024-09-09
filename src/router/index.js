import { createRouter, createWebHashHistory } from 'vue-router'
import Landing from "@/views/Landing.vue";
import About from "@/views/About.vue";
import Main from "@/views/Main.vue";

const routes = [
    {
        path: "/",
        name: "Landing",
        component: Landing,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/main",
        name: "Main",
        component: Main,
    }
];


const router = createRouter({
  history: createWebHashHistory(),
    routes,
});

export default router;