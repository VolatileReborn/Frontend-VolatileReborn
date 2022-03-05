import {EMPLOYEE_MODULE} from "@/api/_prefix";
import {EMPLOYER_MODULE} from "@/api/_prefix";
import axios from "axios";

/**
 * 接包方发布测试报告 POST /employee/uploadTestReport
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const publishReport = payload => {
    const {testReport,token,taskId} = payload
    return axios.post(`${EMPLOYEE_MODULE}/uploadTestReport`,{testReport,token,taskId})
        .then(res => {
            return res.data
        })
    // return Promise.resolve({
    //     "code":1,
    //     "msg":'报告发布成功',
    //     "data":{
    //         "testReport":testReport,
    //         "token":token,
    //         "taskId":taskId
    //     }
    // })
}


/**
 * 发包方查看测试报告列表 GET /employer/checkReports
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const browserReports = payload =>  {
    const {token,taskId} = payload;
    return axios.get(`${EMPLOYER_MODULE}/checkReports?token=${token}&taskId=${taskId}`)
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
    const {taskId,reportId,token} = payload;
    return axios.get(`${EMPLOYEE_MODULE}/reportDetail?taskId=${taskId}&reportId=${reportId}&token=${token}`)
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
    const {taskId,reportId,token} = payload;
    return axios.get(`${EMPLOYER_MODULE}/reportDetail?taskId=${taskId}&reportId=${reportId}&token=${token}`)
        .then(res => {
            return res.data
        })
}