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