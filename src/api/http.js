import axios from 'axios'
var instance = axios.create({})
instance.interceptors.request.use(
    config => {
        const token = window.localStorage.getItem("token");
        if(token && token!=="")
        {
            config.headers.accessToken = token;
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)
export default instance;