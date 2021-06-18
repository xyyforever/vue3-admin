import {goLogin} from "@/utils/Request";

export const HEADERS: any = {}


const BASE_URL = import.meta.env.VITE_APP_BASE_URL as any

// 上传文件url
export const UPLOAD_URL = BASE_URL + '/sales-admin/base/upload'

HEADERS['APP-CLIENT-SECURT'] = 'Y2xpZW50OjEyMzQ1Ng=='
HEADERS['APP-CLIENT-ORGIN'] = 'CA'
HEADERS['deviceId'] = Math.random()
let token:any = localStorage.getItem('TOKEN')
if (token) {
    HEADERS['Authorization'] = `Bearer ${token}`
} else {
    goLogin()
}