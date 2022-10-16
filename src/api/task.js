import axios from "axios"
// import axiosHttp from "@/api/http"
import {TASK_MODULE} from "@/api/_prefix";
import {EMPLOYER_MODULE} from "@/api/_prefix";
import {EMPLOYEE_MODULE} from "@/api/_prefix";
// import {getCurrentInstance} from "vue";
import JSONBIG from 'json-bigint'
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
 * 发布任务 POST /task/publishTask
 * @param payload
 * @returns {Promise<{msg: string, code: number, data}>}
 */
export const publishTask = payload => {
    const { task } = payload;
    return axios.post(`${TASK_MODULE}/publishTask`,{task})
        .then(res => {
            return res.data
        })
    // return Promise.resolve({
    //    "response":{
    //        "code":100,
    //        "message":'任务发布成功'
    //    },
    //     "task":task
    // })
}
/**
 * 发布任务 POST /task/publishComposeTask
 * @param payload
 * @returns {Promise<{msg: string, code: number, data}>}
 */
 export const publishComposeTask = payload => {
    const { task } = payload;
    return axios.post(`${TASK_MODULE}/compositeTask/publish`,{task})
        .then(res => {
            return res.data
        })
}
/**
 * 接受任务 POST /task/acceptTask
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const acceptTask = payload => {
    const {taskId} = payload;
    return axios.post(`${TASK_MODULE}/acceptTask`,{taskId})
        .then(res => {
            return res.data
        })
    // return Promise.resolve({
    //         "taskId":taskId,
    //     "response":
    //         {
    //             "code":500,
    //             "message":'报名成功'
    //         }
    //
    // })
}

/**
 * 发包方在个人中心查看任务详情 GET /employer/browserTaskDetail
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const employerBrowserTaskDetail = payload =>{
    const {taskId} = payload
    return axios.get(`${EMPLOYER_MODULE}/browserTaskDetail?taskId=${taskId}`)
        .then(res => {
            return res.data
        })

    // return Promise.resolve({
    //     "similarity": 11,
    //     "taskDifficulty": 54,
    //     "taskUrgency": "qui dolore",
    //     "taskDeviceRequirements": [
    //         {
    //             "Android": false,
    //             "Linux": true,
    //             "IOS": true
    //         }
    //     ],
    //     "beginTime": 24365288336,
    //     "requirementDescriptionFileList": [
    //         {
    //             "fileName": "口保保二林入",
    //             "fileURL": "http://nqwel.bh/cxascldl"
    //         },
    //         {
    //             "fileName": "价老角",
    //             "fileURL": "http://ufnfjhlfj.cl/qltuyxlf"
    //         },
    //         {
    //             "fileName": "量气北土达回",
    //             "fileURL": "http://rekvnuc.mn/zmucm"
    //         },
    //         {
    //             "fileName": "非取称设重改",
    //             "fileURL": "http://tbyxnwcmg.sb/skmggbgbj"
    //         }
    //     ],
    //     "endTime": 35996875291,
    //     "response": {
    //         "message": "laborum proident Duis non",
    //         "code": -99349848
    //     },
    //     "taskState": 87,
    //     "taskIntroduction": "cillum",
    //     "taskName": "那完没",
    //     "executableFileList": [
    //         {
    //             "fileName": "民解面你",
    //             "fileURL": "http://ljec.aw/fvbcxor"
    //         }
    //     ],
    //     "type": -58506106,
    //     "workerNumTotal": 37,
    //     "workerNumLeft": 95
    // })
}

/**
 * 接包方在个人中心查看任务详情 GET /employee/browserTaskDetail
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const employeeBrowserTaskDetail = payload => {
    const{taskId} = payload
    return axios.get(`${EMPLOYEE_MODULE}/browserTaskDetail?taskId=${taskId}`)
        .then(res => {
            return res.data
        })

    // return new Promise({
    //     "taskDifficulty": 43,
    //     "taskUrgency": "aliquip",
    //     "taskDeviceRequirements": [
    //         {
    //             "Linux": false,
    //             "IOS": false,
    //             "Android": true
    //         },
    //         {
    //             "Android": true,
    //             "Linux": true,
    //             "IOS": true
    //         },
    //         {
    //             "Linux": false,
    //             "IOS": false,
    //             "Android": true
    //         },
    //         {
    //             "Android": true,
    //             "IOS": true,
    //             "Linux": true
    //         }
    //     ],
    //     "beginTime": 170597701571,
    //     "requirementDescriptionFileList": [
    //         {
    //             "fileName": "术本有设",
    //             "fileURL": "http://sdupmhxy.ir/bdieeq"
    //         },
    //         {
    //             "fileName": "分十群组始达外",
    //             "fileURL": "http://kec.mz/wsgu"
    //         },
    //         {
    //             "fileName": "采道且标法",
    //             "fileURL": "http://ppqtomhdxy.my/xiwyqc"
    //         },
    //         {
    //             "fileName": "进却面",
    //             "fileURL": "http://ircxzum.ml/hvtpgf"
    //         }
    //     ],
    //     "endTime": 995527581327,
    //     "response": {
    //         "message": "aute",
    //         "code": 76
    //     },
    //     "taskState": 44,
    //     "taskIntroduction": "ullamco minim",
    //     "taskName": "里史料来九道",
    //     "executableFileList": [
    //         {
    //             "fileName": "据北主你",
    //             "fileURL": "http://djc.asia/eexskcpfug"
    //         },
    //         {
    //             "fileURL": "http://esdckkd.ev/voujxvbk",
    //             "fileName": "见维计提建切"
    //         },
    //         {
    //             "fileName": "区保响南今但器",
    //             "fileURL": "http://psnqqbqy.th/jwsgkkvuxu"
    //         }
    //     ],
    //     "type": 100,
    //     "workerNumTotal": 71,
    //     "workerNumLeft": 24,
    //     "isSubmitted": 69,
    //     "reportId": 48
    // })
}