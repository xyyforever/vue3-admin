/* eslint-disable */
import axios from "axios";
import {ElMessage, ElLoading} from "element-plus";
import qs from "qs"
import {HEADERS} from "@/utils/upload";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL as any

// 登录跳转
export function goLogin () {
    // @ts-ignore
    window.location.href = import.meta.env.VITE_APP_URL
}


export default class Request {
    private static loading: any;
    //设置loading样式
    static startLoading() {
        this.loading = ElLoading.service({
            lock: true,
            text: "加载中",
            background: "rgba(255,255,255,0.7)"
        });
    }
    //取消loading
    static endLoading() {
        return new Promise((resolve, reject) => {
            resolve(this.loading.close());
        });
    }
    static jsonHttp = axios.create({
        baseURL: BASE_URL + '/sales-admin',
        timeout: 30000,
        withCredentials: false,
        headers: {
            "Content-Type": "application/json",
            'APP-CLIENT-SOURCE': '2',
        }
    });
    // 原始请求,全部自己传
    static $axios = axios

    //post FormData
    static postFormData(url: string, data: any) {
        let params = {
            ...data,
        };
        Request.startLoading();
        return Request.jsonHttp
            .post(url, qs.stringify(params), {
                headers: {"content-type": "application/x-www-form-urlencoded"}
            })
            .then(res => {
                Request.endLoading();
                return res.data;
            })
            .catch(error => {
                Request.catchErrors(error);
                // throw error;
                return error;
            });
    }

    //get json
    static getJson(url: string, data: any) {
        Request.startLoading();
        let params = data
        return Request.jsonHttp
            .get(url, {
                params
            })
            .then(res => {
                Request.endLoading();
                return res.data;
            })
            .catch(error => {
                Request.catchErrors(error);
                // throw error;
                return error;
            });
    }

    //post json
    static postJson(url: string, data: any) {
        let params = data
        Request.startLoading();
        params = JSON.stringify(injectParams(params));
        return Request.jsonHttp
            .post(url, params)
            .then(res => {
                Request.endLoading();
                return res.data;
            })
            .catch(error => {
                Request.catchErrors(error);
                // throw error;
                return error;
            });
    }

    // put
    static putJson(url: string, data: any) {
        Request.startLoading();
        return Request.jsonHttp.put(url, qs.stringify({
            ...data
        }), {
            // baseURL: '',
            headers: {"content-type": "application/x-www-form-urlencoded"}
        }).then(res => {
            Request.endLoading();
            return res.data;
        })
            .catch(error => {
                Request.catchErrors(error);
                throw error;
            });
    }

    //delete json
    static deleteJson(url: string, data: any) {
        let params = data
        Request.startLoading();
        // params = JSON.stringify(injectParams(params));
        return Request.jsonHttp
            .delete(url, {params: params})
            .then(res => {
                Request.endLoading();
                return res.data;
            })
            .catch(error => {
                Request.catchErrors(error);
                // throw error;
                return error;
            });
    }

    static catchErrors(error: any) {
        ElMessage.error("网络异常，请刷新重试");
        Request.endLoading();
        console.log("这里是接口err======>>>>", error.response, error);
    }
}
let UUID = Math.random();
//拦截
Request.jsonHttp.interceptors.request.use(config => {
    let token:any = localStorage.getItem('TOKEN')
    config.headers['deviceId'] = UUID
    config.headers['APP-CLIENT-ORGIN'] = 'CA'
    config.headers['APP-CLIENT-SECURT'] = 'Y2xpZW50OjEyMzQ1Ng=='
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    } else {
        goLogin()
    }
    return injectHeader(config);
});

// 添加响应拦截器
Request.jsonHttp.interceptors.response.use((response) => {
    return injectHeader(response);
}, (error) => {
    // 对响应错误做点什么
    let code = parseInt(error.response && error.response.status);
    let token = localStorage.getItem('TOKEN');
    // 返回401
    if (error.response && code == 401) {
        goLogin()
    } else if (error.response && code >= 500) {
        ElMessage.error("网络异常，请刷新重试");
    }
    return Promise.reject(error);
})

// 被挂起的请求数组
let subscribers: any[] = []

// push所有请求到数组中
function addSubscriber(callback: any) {
    subscribers.push(callback)
}

// 刷新请求
function onAccessTokenFetched(token: string) {
    subscribers.forEach(callback => {
        callback(token)
    })
    subscribers = []
}

//请求地址
Request.$axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL as any
Request.$axios.defaults.withCredentials = false
// $axios拦截
Request.$axios.interceptors.request.use(config => {
    config.headers['deviceId'] = UUID
    config.headers['APP-CLIENT-ORGIN'] = 'CA'
    config.headers['APP-CLIENT-SECURT'] = 'Y2xpZW50OjEyMzQ1Ng=='
    return injectHeader(config);
});

//注入header
const injectHeader = (config: any) => {
    return config;
};
const injectParams = (param: any) => {
    param = param || {};
    if (isLocalhost()) {
    } else {
    }
    return param;
};

const isLocalhost = () => {
    return location.hostname == "localhost";
};