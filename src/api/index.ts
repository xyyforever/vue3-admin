import Request from '@/utils/Request'
import qs from "qs"

export default {
    //我收到的
    login(data: any) {
        return Request.getJson('/auto', data).then(res => {
            return res
        })
    },
    //我收到的
    getSignUrl(data: any) {
        return Request.postFormData('/base/getSignUrl', data).then(res => {
            return res
        })
    },
    //获取token
    getToken(data: any) {
        return Request.$axios({
            url: '/auth/oauth/token',
            method: 'post',
            data: qs.stringify(data),
            headers: {"content-type": "application/x-www-form-urlencoded"}
        }).then(res => {
            return res.data
        })
    },
    //文件上传
    upload(data: any) {
        return Request.postJson('/base/upload', data).then(res => {
            return res
        })
    },
}


