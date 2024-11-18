import { createRouter, createWebHashHistory } from 'vue-router'
import Landing from "@/views/Landing.vue";
import About from "@/views/About.vue";
import KnifeTest from '../views/KnifeTest.vue';

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
    }
];


const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;