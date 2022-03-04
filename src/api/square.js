import {SQUARE_MODULE} from "@/api/_prefix";
import axios from "axios";

/**
 * 浏览任务广场 GET /square/browserTasks
 * @returns {Promise<{msg: string, code: number, data: {taskList: [{workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}, {workerNumLeft: number, taskType: number, taskName: string, workerNumTotal: number, taskId: number, taskStartTime: string, taskEndTime: string}]}}>}
 */
export const browserTasks = () => {
    return axios.get(`${SQUARE_MODULE}/browserTasks`)
        .then(res => {
            return res.data
        })
    // return Promise.resolve({
    //     "code":1,
    //     "msg":"获取数据成功",
    //     "data":{
    //         "taskList":[
    //             {taskId: 0,taskName: 'test_task',taskType: 0,workerNumTotal: 10,workerNumLeft: 5,taskStartTime: '2022-3-1',taskEndTime: '2022-5-3'},
    //             {taskId: 1,taskName: 'test_task333',taskType: 1,workerNumTotal: 20,workerNumLeft: 6,taskStartTime: '2022-3-1',taskEndTime: '2022-5-3'},
    //             {taskId: 2,taskName: 'test_task5',taskType: 0,workerNumTotal: 20,workerNumLeft: 6,taskStartTime: '2022-3-1',taskEndTime: '2022-5-3'},
    //             {taskId: 3,taskName: 'test_task363',taskType: 1,workerNumTotal: 20,workerNumLeft: 6,taskStartTime: '2022-3-1',taskEndTime: '2022-5-3'},
    //         ]
    //     }
    // })

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