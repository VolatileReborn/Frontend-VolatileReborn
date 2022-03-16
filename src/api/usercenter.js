import {SQUARE_MODULE} from "@/api/_prefix";
import {EMPLOYEE_MODULE} from "@/api/_prefix";
import {EMPLOYER_MODULE} from "@/api/_prefix";
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
 * 接包方浏览正在执行的任务 GET /api/employee/browserUndertakingTasks
  * @returns {Promise<{msg: string, code: number, data: {taskList: [{workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}]}}>}
 */
export const employeeBrowserUndertakingTasks = () => {
    return axios.get(`${EMPLOYEE_MODULE}/browserUndertakingTasks`)
        .then(res => {
            return res.data
        })


}

/**
 * 接包方浏览已经完成的任务 GET /api/employee/browserFinishedTasks
 * @returns {Promise<{msg: string, code: number, data: {finishedTaskList: [{taskType: number, taskName: string, taskId: number, taskStartTime: string, taskEndTime: string}, {taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {taskType: number, taskName: string, taskId: number, taskStartTime: string, taskEndTime: string}, {taskType: number, taskName: string, taskId: number, taskStartTime: string, taskEndTime: string}]}}>}
 */
 export const employeeBrowserFinishedTasks = () => {
    return axios.get(`${EMPLOYEE_MODULE}/browserFinishedTasks`)
        .then(res => {
            return res.data
        })

}
    
/**
 * 发包方浏览正在执行的任务 GET /api/employer/browserUndertakingTasks
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
//             "taskList":[
//                 {taskId: 0,taskName: 'test_task',taskType: 0,workerNumTotal: 10,workerNumLeft: 5,taskStartTime: '2022-3-1',taskEndTime: '2022-5-3'},
//                 {taskId: 1,taskName: 'test_task333',taskType: 1,workerNumTotal: 20,workerNumLeft: 6,taskStartTime: '2022-3-1',taskEndTime: '2022-5-3'},
//                 {taskId: 2,taskName: 'test_task5',taskType: 0,workerNumTotal: 20,workerNumLeft: 6,taskStartTime: '2022-3-1',taskEndTime: '2022-5-3'},
//                 {taskId: 3,taskName: 'test_task363',taskType: 1,workerNumTotal: 20,workerNumLeft: 6,taskStartTime: '2022-3-1',taskEndTime: '2022-5-3'},
//             ]
//         }
//     })


}

/**
 * 发包方浏览已经完成的任务 GET /api/employer/browserFinishedTasks 
 * @returns {Promise<{msg: string, code: number, data: {finishedTaskList: [{workerNumTotal: number, taskType: number, taskName: string, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumTotal: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumTotal: number, taskType: number, taskName: string, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumTotal: number, taskType: number, taskName: string, taskId: number, taskStartTime: string, taskEndTime: string}]}}>}
 */
 export const employerBrowserFinishedTasks = () => {
    return axios.get(`${EMPLOYER_MODULE}/browserFinishedTasks`)
        .then(res => {
            return res.data
        })

}


/**
 * 发包方浏览大厅中的具体任务 GET /square/employeeTaskDetail
 * @param payload
 * @returns {Promise<{code: number, data: {task: {workerNumLeft: number, taskType: number, taskState: boolean, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string, taskIntroduction: string}, isSelected: boolean}, message: string}>}
 */
export const employeeTaskDetail = payload =>{
    const {taskId} = payload ;
    return axios.get(`${SQUARE_MODULE}/employeeTaskDetail/taskId=${taskId}`)
        .then(res =>{
            return res.data
        })
    // return Promise.resolve({
    //     "code":1,
    //     "message":"接包方浏览任务",
    //     "data":{
    //         "task":{
    //             taskId: 0,
    //             taskName: 'test_task',
    //             taskType: 0,
    //             workerNumTotal: 10,
    //             workerNumLeft: 5,
    //             taskStartTime: '2022-3-1',
    //             taskEndTime: '2022-5-3',
    //             taskState: true,
    //             taskIntroduction: '这是一个测试任务',
    //         },
    //         "isSelected":false,
    //         "token":token,
    //         "taskId":taskId
    //     }
    // })
}

export const employerTaskDetail = payload => {
    const {taskId} = payload;
    return axios.get(`${SQUARE_MODULE}/employerTaskDetail/taskId=${taskId}`)
        .then(res => {
            return res.data
        })
    // return Promise.resolve({
    //     "code":1,
    //     "msg":"发包方浏览任务",
    //     "data":{
    //         "token":token,
    //         "task":{
    //             taskId: taskId,
    //             taskName: 'test_task',
    //             taskType: 0,
    //             workerNumTotal: 10,
    //             workerNumLeft: 5,
    //             taskStartTime: '2022-3-1',
    //             taskEndTime: '2022-5-3',
    //             taskState: true,
    //             taskIntroduction: '这是一个测试任务',
    //         }
    //     }
    // })

}

export const publishReport=payload=>{
    const {testReport,taskId}=payload
    return axios.post(`${EMPLOYEE_MODULE}/uploadTestReport`,{testReport,taskId})
        .then(res=>{
            return res.data
        })
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