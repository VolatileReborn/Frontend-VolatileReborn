import {createRouter,createWebHistory} from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login";
import Register from "@/views/Register";
import TaskSquare from "@/views/task/TaskSquare";
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
    },
    {
        path:"/taskSquare",
        name: "TaskSquare",
        component: TaskSquare
    }
];
const router = createRouter({
    history: routerHistory,
    routes
})

export default router;
