import axios from "axios";
// import { getQueryString } from "@/utils/getUrl";
import { MessageBox, Message, Loading } from "element-ui";
import Store from '@/store'

var getToken = localStorage.getItem('token')
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: 20000 // request timeout
});

service.interceptors.request.use(
    config => {
        if (Store.state.userInfo) {
            config.headers['Authorization'] = 'Bearer ' + Store.state.userInfo.Token
        } else {
            config.headers['Authorization'] = ''
        }
        // config.headers['token'] = ''
        config.headers["Accept-Language"] = localStorage.getItem('languageStorage') || 'en-US';
        // config.headers["Accept-Language"] = 'zh-CN'
        // config.headers['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE3MjM5NTkxNDQsInVzZXJfaWQiOjQwfQ.tqOyMdqiM0T9FUHseoO78r2i6CxnvJRvaK5PhybPpQc'
        // }
        return config;
    },
    error => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    response => {
        if (response.status >= 400) {
            const errMessage = response.statusText || response.error || response.msg || "Error";
            Message({
                message: errMessage,
                type: "error",
                duration: 3 * 1000
            });
            return Promise.reject(new Error(errMessage));
        } else {
            if (response.data.errorCode == 1000) {
                Store.commit('ShowLoginModal') //显示登录提示
            }
            successState(response);
            return response.data;
        }
    },
    error => {
        // Store.commit('ShowLoginModal')
        console.log("err" + error + process.env.VUE_APP_BASE_API); // for debug
        Message({
            message: error.response.data.msg,
            type: "error",
            duration: 3 * 1000
        });
        return Promise.reject(error);
    }
);
function successState(res) {
    if (res.data.errorCode && (res.data.errorCode == 20003 || res.data.errorCode == 41)) {
        Message({
            message: res.data.msg,
            type: "error",
            duration: 3 * 1000
        });
    }else if(res.data.errorCode == 1000){
        Store.commit('ShowLoginModal')
    }
    return
}
export default service;
