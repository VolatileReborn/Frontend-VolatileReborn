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
import UserCenterofEmployee from "@/views/user/UserCenterofEmployee"
import UserCenterofEmployer from "@/views/user/UserCenterofEmployer"
// import UndertakingTasksForEmployee from "@/views/undertakingTasksForEmployee/UndertakingTasksForEmployee"
// import UndertakingTasksForEmployer from "@/views/undertakingTasksForEmployer"
import UndertakingTasksForEmployer from "@/views/undertakingTasksforEmployer/UndertakingTasksForEmployer";
import UndertakingTasksForEmployee from "@/views/undertakingTasksForEmployee/UndertakingTasksForEmployee";
import FinishedTasksForEmployee from "@/views/finishedTasksForEmployee"
import FinishedTasksForEmployer from "@/views/finishedTasksForEmployer"
import ReportReleaseSucceed from "@/views/report/ReportReleaseSucceed"
import UserCenterOfManager from "@/views/user/UserCenterOfManager";

import ReportInfo from "@/views/report/ReportInfo";

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
        path: "/reportInfo",
        name: "ReportInfo",
        component: ReportInfo
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
    },
    {
        path:"/userCenterofEmployee",
        name: "UserCenterofEmployee",
        component: UserCenterofEmployee
    },
    {
        path:"/userCenterofEmployer",
        name: "UserCenterofEmployer",
        component: UserCenterofEmployer
    },
    {
        path:"/userCenterOfManager",
        name: "UserCenterOfManager",
        component: UserCenterOfManager
    },
    {
        path : "/1",
        name: "UndertakingTasksForEmployee",
        component: UndertakingTasksForEmployee
    },
    {
        path : "/2",
        name: "FinishedTasksForEmployee",
        component: FinishedTasksForEmployee
    },
    {
        path : "/3",
        name: "UndertakingTasksForEmployer",
        component: UndertakingTasksForEmployer
    },
    {
        path : "/4",
        name: "FinishedTasksForEmployer",
        component: FinishedTasksForEmployer
    },
    {
        path: "/reportReleaseSucceed",
        name: "ReportReleaseSucceed",
        component: ReportReleaseSucceed
    }
];
const router = createRouter({
    history: routerHistory,
    routes
})

export default router;
