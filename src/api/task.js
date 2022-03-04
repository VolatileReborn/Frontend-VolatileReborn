import axios from "axios"
import {TASK_MODULE} from "@/api/_prefix";
import {EMPLOYER_MODULE} from "@/api/_prefix";


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

/**
 * 发包方在个人中心查看报告详情 GET /employer/browserTaskDetail
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const employerBrowserTaskDetail = payload =>{
    const {token,taskId} = payload
    return axios.get(`${EMPLOYER_MODULE}/browserTaskDetail?token=${token}&taskId=${taskId}`)
        .then(res => {
            return res.data
        })

    // return Promise.resolve({
    //     "code":1,
    //     "msg":'获取任务数据成功',
    //     "data":{
    //         "token":token,
    //         "taskId":taskId,
    //         "workerNumTotal": 20,
    //         "taskState":true,
    //         "workerNumLeft": 5,
    //         "requirementDescriptionFileList":[
    //             {"fileName": "G-Git.pdf", "fileURL": "https://se3-volatile.oss-cn-beijing.aliyuncs.com/files/20220305/20220305015239_g5m5.pdf"}],
    //         "executableFileList":[{"fileName": "Firefox-latest.exe", "fileURL": "https://se3-volatile.oss-cn-beijing.aliyuncs.com/files/20220305/20220305015153_m51l.exe"}],
    //         "taskName":'测试任务',
    //         "taskIntroduction":'测试任务简介',
    //         "type": 0,
    //         "beginTime": '2022-3-5',
    //         "endTime":'2022-3-5'
    //     }
    // })
}