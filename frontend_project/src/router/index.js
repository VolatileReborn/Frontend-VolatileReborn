import {createRouter,createWebHistory} from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login";
import Register from "@/views/Register";
const routerHistory = createWebHistory();


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        // children:[]
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    }
];
const router = createRouter({
    history: routerHistory,
    routes
})

export default router;
