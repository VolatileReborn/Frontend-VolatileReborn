import {createRouter,createWebHashHistory} from "vue-router";
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
import ReportReleaseSucceed from "@/views/report/ReportReleaseSucceed"
import UserCenterOfManager from "@/views/user/UserCenterOfManager";
import ReportInfo from "@/views/report/ReportInfo";
import TaskReleaseSucceed from "@/views/task/TaskReleaseSucceed"
import TaskFinished from "@/views/user/TaskFinished"
import ReportCooperate from "@/views/report/ReportCooperate"
import ReportInfoCooperation from "@/views/report/ReportInfoCooperation"
import MyReportInfo from '@/views/report/MyReportInfo'
const routerHistory = createWebHashHistory();
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
        path:'/myReportInfo',
        name:'MyReportInfo',
        component: MyReportInfo
    },
    {
        path:'/reportInfoCooperation',
        name:'ReportInfoCooperation',
        component: ReportInfoCooperation
    },
    {
        path: "/taskEnrollSucceed",
        name: "TaskEnrollSucceed",
        component: TaskEnrollSucceed
    },
    {
        path: "/registerSucceed",
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
        path: "/reportReleaseSucceed",
        name: "ReportReleaseSucceed",
        component: ReportReleaseSucceed
    },
    {
        path: "/taskReleaseSucceed",
        name: "TaskReleaseSucceed",
        component: TaskReleaseSucceed
    },
    {
        path: "/taskFinished",
        name: "TaskFinished",
        component: TaskFinished
    },
    {
        path:"/reportCooperate",
        name:"ReportCooperate",
        component: ReportCooperate
    }
];
const router = createRouter({
    history: routerHistory,
    routes
})

export default router;
