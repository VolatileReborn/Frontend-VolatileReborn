import {EMPLOYEE_MODULE} from "@/api/_prefix";
// import {EMPLOYER_MODULE} from "@/api/_prefix";
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