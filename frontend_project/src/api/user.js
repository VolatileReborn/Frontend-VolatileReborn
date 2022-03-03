import axios from "axios"
import { USER_MODULE} from "@/api/_prefix";


/**
 * 用户注册 POST /user/register
 * @param payload
 * @returns {*}
 */
export const register = payload => {
    const {phoneNumber,password,role,nickname} = payload;
    return axios
        .post(`${USER_MODULE}/register`,{
            phoneNumber,
            password,
            role,
            nickname
        })
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
    const {phoneNumber,password} = payload;
    return axios.get(`${USER_MODULE}/login`,{phoneNumber,password})
        .then(res => {
            return res.data;
        })
    // return Promise.resolve({
    //     "code":1,
    //     "msg": "登录成功",
    //     "data":{
    //         "phoneNumber": phoneNumber,
    //         "password":password
    //     }
    //
    // })
}