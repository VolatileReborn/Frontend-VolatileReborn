import {EMPLOYEE_MODULE} from "@/api/_prefix";
import {EMPLOYER_MODULE} from "@/api/_prefix";
import axios from "axios";
import JSONBIG from "json-bigint";
import {REPORT_MODULE} from "@/api/_prefix";

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
 * 接包方发布测试报告 POST /employee/uploadTestReport
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const publishReport = payload => {
    const {testReport,taskId} = payload
    return axios.post(`${EMPLOYEE_MODULE}/uploadTestReport`,{testReport,taskId})
        .then(res => {
            return res.data
        })
    // return Promise.resolve({
    //     "response":{
    //         "code":100,
    //         "message":'发布成功'
    //     },
    //     "testReport":testReport,
    //     "taskId":taskId
    //
    // })
}
/**
 * 发包方查看测试报告列表 GET /employer/checkReports
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const browserReports = payload =>  {
    const {taskId} = payload;
    return axios.get(`${REPORT_MODULE}/checkReports?taskId=${taskId}`)
        .then(res => {
            return res.data
        })
}

/**
 * 接包方查看报告详情 GET /employee/reportDetail
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const employeeGetReportInfo = payload => {
    const {taskId,reportId} = payload;
    return axios.get(`${EMPLOYEE_MODULE}/reportDetail?taskId=${taskId}&reportId=${reportId}`)
        .then(res => {
            return res.data
        })
}

/**
 * 发包方查看报告详情 GET /employer/reportDetail
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const employerGetReportInfo = payload => {
    const {taskId,reportId} = payload;
    return axios.get(`${EMPLOYER_MODULE}/reportDetail?taskId=${taskId}&reportId=${reportId}`)
        .then(res => {
            return res.data
        })
}
/**
 * 接包方查看已经协作的报告列表 GET /employee/employeeBrowserFinishedCooperation
 * @returns {Promise<{response: {code: number, message: string}, reportList: [{reportId: number, reportName: string, similarity: number}]}>}
 */
export const getCooperationList = () => {
    return axios.get(`${EMPLOYEE_MODULE}/employeeBrowserFinishedCooperation`)
        .then(res =>{
            return res.data
        })
   /* return Promise.resolve({
        "response":
            {
                "code":100,
                "message":'获取数据成功'
            },
        "reportList":[
            {
                "reportId":23,
                "reportName":'协作报告',
                "similarity":45
            }
        ]
    })*/
}
/**
 * 接包方查看所有任务的可协作列表 GET /employee/getAllCooperation
 * @returns {Promise<{response: {code: number, message: string}, reportList: [{reportId: number, reportName: string, similarity: number}]}>}
 */
export const getAllCooperation = () =>{
    return axios.get(`${EMPLOYEE_MODULE}/getAllCooperation`)
        .then(res => {
            return res.data
        })

   //   return Promise.resolve({
   //     "response":
   //         {
   //             "code":100,
   //             "message":'获取数据成功'
   //         },
   //     "reportList":[
   //         {
   //             "reportId":23,
   //             "reportName":'协作报告',
   //             "similarity":45
   //         }
   //     ]
   // })
}

/**
 * 接包方提交协作报告 POST /employee/employeeReleaseCooperation
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const publishCooperation = payload => {
    const {taskId,parentId,taskReport} = payload
    return axios.post(`${EMPLOYEE_MODULE}/employeeReleaseCooperation`,{parentId,taskReport,taskId})
        .then(res => {
            return res.data
        })
}

/**
 * 接包方在报告详情页查看该报告的可写作报告列表 GET /employee/getThisCooperation
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getThisCooperation = payload => {
    const {reportId} =payload
    return axios.get(`${EMPLOYEE_MODULE}/getThisCooperation`,{reportId})
        .then(res => {
            return res.data
        })
}

/**
 * 接包方给同任务的报告评分
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const scoreReport = payload => {
    const {score,reportId,comment} = payload
    return axios.post(`${EMPLOYEE_MODULE}/scoreReport`,{score,reportId,comment})
        .then(res => {
            return res.data
        })
}
