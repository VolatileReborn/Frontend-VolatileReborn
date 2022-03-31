import {EMPLOYEE_MODULE} from "@/api/_prefix";
import {EMPLOYER_MODULE} from "@/api/_prefix";
import {ADMIN_MODULE} from "@/api/_prefix";
import axios from "axios";
import JSONBIG from "json-bigint";

axios.interceptors.request.use(
    config => {
        const token = window.localStorage.getItem("token");
        if(token && token!=="")
        {
            config.headers.Authorization = token;
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)
axios.defaults.transformResponse = [
    function (data) {
        const json = JSONBIG ({
            storeAsString: true
        })
        const res = json.parse(data)
        return res

    }
]
/**
 * 接包方浏览正在执行的任务列表 GET /api/employee/browserUndertakingTasks
  * @returns {Promise<{msg: string, code: number, data: {taskList: [{workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}]}}>}
 */
export const employeeBrowserUndertakingTasks = () => {
    return axios.get(`${EMPLOYEE_MODULE}/browserUndertakingTasks`)
        .then(res => {
            return res.data
        })
}

/**
 * 接包方浏览已经完成的任务列表 GET /api/employee/browserFinishedTasks
 * @returns {Promise<{msg: string, code: number, data: {finishedTaskList: [{taskType: number, taskName: string, taskId: number, taskStartTime: string, taskEndTime: string}, {taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {taskType: number, taskName: string, taskId: number, taskStartTime: string, taskEndTime: string}, {taskType: number, taskName: string, taskId: number, taskStartTime: string, taskEndTime: string}]}}>}
 */
 export const employeeBrowserFinishedTasks = () => {
    return axios.get(`${EMPLOYEE_MODULE}/browserFinishedTasks`)
        .then(res => {
            return res.data
        })

}
    
/**
 * 发包方浏览正在执行的任务列表 GET /api/employer/browserUndertakingTasks
  * @returns {Promise<{msg: string, code: number, data: {taskList: [{workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}]}}>}
 */
 export const employerBrowserUndertakingTasks =() => {
    return axios.get(`${EMPLOYER_MODULE}/browserUndertakingTasks`)
        .then(res => {
            return res.data
        })
// return Promise.resolve({
//         "code":1,
//         "msg":"获取数据成功",
//         "data":{
//             "token":token,
//             "undertakingTaskList":[
//                 {taskId: 0,taskName: 'test_task',taskType: 0,workerNumTotal: 10,workerNumLeft: 5,taskStartTime: '2022-3-1',taskEndTime: '2022-5-3'},
//                 {taskId: 1,taskName: 'test_task333',taskType: 1,workerNumTotal: 20,workerNumLeft: 6,taskStartTime: '2022-3-1',taskEndTime: '2022-5-3'},
//                 {taskId: 2,taskName: 'test_task5',taskType: 0,workerNumTotal: 20,workerNumLeft: 6,taskStartTime: '2022-3-1',taskEndTime: '2022-5-3'},
//                 {taskId: 3,taskName: 'test_task363',taskType: 1,workerNumTotal: 20,workerNumLeft: 6,taskStartTime: '2022-3-1',taskEndTime: '2022-5-3'},
//             ]
//         }
//     })
}
/**
 * 发包方浏览已经完成的任务列表 GET /api/employer/browserFinishedTasks
 * @returns {Promise<{msg: string, code: number, data: {finishedTaskList: [{workerNumTotal: number, taskType: number, taskName: string, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumTotal: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumTotal: number, taskType: number, taskName: string, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumTotal: number, taskType: number, taskName: string, taskId: number, taskStartTime: string, taskEndTime: string}]}}>}
 */
 export const employerBrowserFinishedTasks = () => {
    return axios.get(`${EMPLOYER_MODULE}/browserFinishedTasks`)
        .then(res => {
            return res.data
        })

    // return new Promise({
    //     "response":
    //         {
    //             "code":100,
    //             "message":'获取数据成功'
    //         },
    //     "FinishedTaskList":[]
    // })


}

/**
 * 完成任务 PUT /api/employer/browserChecked
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
 export const browserChecked = payload => {
    const {taskId} = payload;
    return axios.put(`${EMPLOYER_MODULE}/browserChecked`,{taskId})
        .then(res => {
            return res.data
        })
}

/**
 * 管理员查看系统所有任务 GET /admin/browserAllTasks
 * @returns {Promise<AxiosResponse<any>>}
 */
 export const adminBrowserAllTasks = () => {
     return axios.get(`${ADMIN_MODULE}/browserAllTasks`)
         .then(res =>{
             return res.data
         })
}

/**
 * 管理员设置推荐规则 POST /admin/setRecommendRule
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const setRecommendRule = payload => {
     const {emphasized_user_features,
         desalted_user_features,
         emphasized_task_features,
         desalted_task_features} = payload;
    return axios.post(`${ADMIN_MODULE}/setRecommendRule`,{emphasized_user_features,
        desalted_user_features,
        emphasized_task_features,
        desalted_task_features})
        .then(res=>{
            return res.data
        })
}

/**
 * 管理员查看推荐规则 GET /admin/getRecommendRule
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getRecommendRule = () => {
    return axios.get(`${ADMIN_MODULE}/getRecommendRule`)
        .then(res=> {
            return res.data
        })
}
/**
 * 管理员个人中心获取任务详情
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const adminGetTaskDetail = payload => {
    const {taskId} = payload
    return axios.get(`${ADMIN_MODULE}/browserTaskDetail?taskId=${taskId}`)
        .then(res => {
            return res.data
        })
}
/**
 * 管理员查看相似度算法 GET  /admin/getAlgorithm
 * @returns {Promise<AxiosResponse<any>>}
 */
export const adminGetAlgorithm = () => {
    return axios.get(`${ADMIN_MODULE}/getAlgorithm`)
        .then(res => {
            return res.data
        })
}
/**
 * 管理员设置相似度算法 POST /admin/setAlgorithm
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const adminSetAlgorithm = payload => {
    const {rule} = payload
    return axios.post(`${ADMIN_MODULE}/setAlgorithm`,{rule})
        .then(res => {
            return res.data
        })
}