import { STAKEHOLDER_MODULE } from "./_prefix";
import axios from "axios"

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
 * 获取众包工人状态
 * @param {pageNum, pageSize} args 
 * @returns 
 */
export const getgetEmployeeStatus = args => {
    return axios.get(`${STAKEHOLDER_MODULE}/employee`,args).then(
        res => {
            return res.data
        }
    )
}


/**
 * 获取发包方状态
 * @param {pageNum, pageSize} args 
 * @returns 
 */
 export const getgetEmployerStatus = args => {
    return axios.get(`${STAKEHOLDER_MODULE}/employer`,args).then(
        res => {
            return res.data
        }
    )
}


/**
 * 获取设备状态
 * @param {pageNum, pageSize} args 
 * @returns 
 */
 export const getgetDeviceStatus = args => {
    return axios.get(`${STAKEHOLDER_MODULE}/device`,args).then(
        res => {
            return res.data
        }
    )
}