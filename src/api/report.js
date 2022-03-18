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
    return axios.get(`${EMPLOYER_MODULE}/checkReports?taskId=${taskId}`)
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