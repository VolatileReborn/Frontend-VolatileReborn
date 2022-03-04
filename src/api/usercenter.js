import {SQUARE_MODULE} from "@/api/_prefix";
import axios from "axios";

/**
 * 接包方浏览正在执行的任务 GET /api/employee/browserUndertakingTasks
  * @returns {Promise<{msg: string, code: number, data: {taskList: [{workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}]}}>}
 */
export const employeeBrowserUndertakingTasks = payload => {
    const {token} = payload;
    return axios.get(`/api/employee/browserUndertakingTasks?token=${token}`)
        .then(res => {
            return res.data
        })

}

/**
 * 接包方浏览已经完成的任务 GET /api/employee/browserFinishedTasks
 * @returns {Promise<{msg: string, code: number, data: {finishedTaskList: [{taskType: number, taskName: string, taskId: number, taskStartTime: string, taskEndTime: string}, {taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {taskType: number, taskName: string, taskId: number, taskStartTime: string, taskEndTime: string}, {taskType: number, taskName: string, taskId: number, taskStartTime: string, taskEndTime: string}]}}>}
 */
 export const employeeBrowserFinishedTasks = payload => {
    const {token} = payload;
    return axios.get(`/api/employee/browserFinishedTasks?token=${token}`)
        .then(res => {
            return res.data
        })

}
    
/**
 * 发包方浏览正在执行的任务 GET /api/employer/browserUndertakingTasks
  * @returns {Promise<{msg: string, code: number, data: {taskList: [{workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}]}}>}
 */
 export const employerBrowserUndertakingTasks = payload => {
    const {token} = payload;
    return axios.get(`/api/employer/browserUndertakingTasks?token=${token}`)
        .then(res => {
            return res.data
        })

}

/**
 * 发包方浏览已经完成的任务 GET /api/employer/browserFinishedTasks 
 * @returns {Promise<{msg: string, code: number, data: {finishedTaskList: [{workerNumTotal: number, taskType: number, taskName: string, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumTotal: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumTotal: number, taskType: number, taskName: string, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumTotal: number, taskType: number, taskName: string, taskId: number, taskStartTime: string, taskEndTime: string}]}}>}
 */
 export const employerBrowserFinishedTasks = payload => {
    const {token} = payload;
    return axios.get(`/api/employer/browserFinishedTasks ?token=${token}`)
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
    const {token,taskId} = payload ;
    return axios.get(`${SQUARE_MODULE}/employeeTaskDetail/${taskId}?token=${token}`)
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
    const {token,taskId} = payload;
    return axios.get(`${SQUARE_MODULE}/employerTaskDetail/${taskId}?token=${token}`)
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
    const {testReport,token,taskId}=payload
    return axios.post(`/api/employee/uploadTestReport`,{testReport,token,taskId})
        .then(res=>{
            return res.data
        })
}