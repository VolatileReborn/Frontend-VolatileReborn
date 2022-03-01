import {createRouter,createWebHistory} from "vue-router";
import Home from "@/views/Home.vue";

const routerHistory = createWebHistory();


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        // children:[]
    }
];
const router = createRouter({
    history: routerHistory,
    routes
})

export default router;
