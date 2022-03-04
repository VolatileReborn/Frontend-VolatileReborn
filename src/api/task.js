import axios from "axios"
import {TASK_MODULE} from "@/api/_prefix";

/**
 * 发布任务 POST /task/publishTask
 * @param payload
 * @returns {Promise<{msg: string, code: number, data}>}
 */
export const publishTask = payload => {
    const { token,task } = payload;
    return axios.post(`${TASK_MODULE}/publishTask`,{token,task})
        .then(res => {
            return res.data
        })
    // return Promise.resolve({
    //     "code":1,
    //     "msg":'任务发布成功',
    //     "data":{
    //         "token" :token,
    //         "task" :task
    //     }
    // })
}

/**
 * 接受任务 POST /task/acceptTask
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const acceptTask = payload => {
    const {token,taskId} = payload;
    return axios.post(`${TASK_MODULE}/acceptTask`,{token,taskId})
        .then(res => {
            return res.data
        })
    // return Promise.resolve({
    //     "code":1,
    //     "msg":"报名成功",
    //     "data":{
    //         "token":token,
    //         "taskId":taskId
    //     }
    // })
}