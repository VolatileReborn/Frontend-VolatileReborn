import {createRouter,createWebHistory} from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login";
import Register from "@/views/Register";
import TaskSquare from "@/views/task/TaskSquare";
import TaskInfoFromSquare from "@/views/task/TaskInfoFromSquare";
import TaskEnrollSucceed from "@/views/task/TaskEnrollSucceed";
import RegisterSucceed from "@/views/user/RegisterSucceed";
import TaskRelease from "@/views/task/TaskRelease";
import TaskInfoFromUser from "@/views/task/TaskInfoFromUser";
import ReportRelease from "@/views/report/ReportRelease";

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
        component: TaskSquare,
    },
    {
        path: "/taskInfoFromSquare/:taskId",
        name: "TaskInfoFromSquare",
        component: TaskInfoFromSquare
    },
    {
        path: "/taskInfoFromUser/:taskId",
        name: "TaskInfoFromUser",
        component: TaskInfoFromUser
    },
    {
        path: "/taskEnrollSucceed",
        name: "TaskEnrollSucceed",
        component: TaskEnrollSucceed
    },
    {
        path: "/registerSucceed/:nickname",
        name: "RegisterSucceed",
        component: RegisterSucceed
    },
    {
        path : "/taskRelease",
        name: "TaskRelease",
        component: TaskRelease
    },
    {
        path: "/reportRelease/:taskId",
        name: "ReportRelease",
        component: ReportRelease
    }
];
const router = createRouter({
    history: routerHistory,
    routes
})

export default router;
