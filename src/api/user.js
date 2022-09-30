import axios from "axios"
import { USER_MODULE} from "@/api/_prefix";
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
 * 用户注册 POST /user/register
 * @param payload
 * @returns {*}
 */
export const register = payload => {
    const {phone_number,password,role,nickname} = payload;
    return axios
        .get(`${USER_MODULE}/register?phone_number=${phone_number}&password=${password}&role=${role}&nickname=${nickname}`)
        .then(res => {
            return res.data;
        })
    /** 前后端分离开发时 前端可以自己写简易的 mock  */
    // return Promise.resolve({
    //     "code":1,
    //     "msg":"注册成功",
    //     "data":{
    //         "phoneNumber": phoneNumber,
    //         "password": password,
    //         "role": role,
    //         "nickname": nickname
    //     }
    // })
};
/**
 * 用户登录 GET /user/login
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const login = payload => {
    const {phone_number,password} = payload;
    return axios.get(`${USER_MODULE}/login?phone_number=${phone_number}&password=${password}`)
        .then(res => {
            return res.data;
        })
    // return Promise.resolve({
    //     "response":{
    //         code:100
    //     },
    //     "msg": "登录成功",
    //         "phoneNumber": phone_number,
    //         "password":password,
    //         "nickname":"test",
    //         "role":2,
    //         "token":123
    
    // })
}

/**
 * 接包方获取用户资料 GET /user/getUserData
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getProfile = () => {
    return axios.get(`${USER_MODULE}/getUserData`)
        .then(res => {
            return res.data
        })

    // return new Promise({
    //     "response":
    //         {
    //             "code":100,
    //             "message":'获取个人资料成功'
    //         },
    //     "nickname":'小明',
    //     "taskFavorList":'???',
    //     "device":['安卓','ios'],
    //     "professionalSkill":'擅长的技术'
    // })
}

/**
 * 接包方设置用户资料 POST /user/setUserProfile
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const setProfile = payload => {
    const {professionalSkill,nickname,taskFavorList,device}  = payload
    return axios.post(`${USER_MODULE}/setUserProfile`,{professionalSkill,nickname,taskFavorList,device})
        .then(res => {
            return res.data
        })

    // return new Promise({
    //     "response":
    //         {
    //             "code":100,
    //             "message":'个人资料修改成功'
    //         }
    // })

}