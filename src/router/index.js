import { createRouter, createWebHashHistory } from 'vue-router'
import Landing from "@/views/Landing.vue";
import About from "@/views/About.vue";
import KnifeTest from '../views/KnifeTest.vue';
import Grid from '../views/Grid.vue';

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
        path: "/knife-test",
        name: "KnifeTest",
        component: KnifeTest,
    },
    {
        path: "/grid",
        name: "Grid",
        component: Grid,
    }
];


const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;