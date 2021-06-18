import Request from '@/utils/Request'
import {AddressInfo} from "@/views/order/orderList/interface";
import {ElMessage} from "element-plus";

export default {
    //订单列表
    getOrderByPage(params: any) {
        return Request.postJson('/admin/order/getOrderByPage',params)
    },
    // 根据报价单号查询报价单
    getQuotationById(params: any) {
        return Request.getJson('/admin/quotation/getQuotationById',params)
    },
    // 获取报价单分页查询
    getQuotationByPage(params: any) {
        return Request.getJson('/admin/quotation/getQuotationByPage',params)
    },
    // 获取合同信息
    getContractInfo(params: any) {
        return Request.getJson('/admin/contract/getContractInfo',params)
    },
    // 审核合同
    auditContract(params: any) {
        return Request.getJson('/admin/contract/auditContract',params)
    },
    // 获取申请表分页查询
    getApplicationByPage(params: any) {
        return Request.getJson('/admin/application/getApplicationByPage',params)
    },
    // 根据申请表编号查询
    getApplicationByOrder(params: any) {
        return Request.getJson('/admin/application/getApplicationByOrder',params)
    },
    // 上传申请表
    uploadApplication(params: any) {
        return Request.postFormData('/admin/application/uploadApplication',params)
    },
    // 获取报告信息
    getReportInfo(params: any) {
        return Request.getJson('/admin/report/getReportInfo',params)
    },
    // 上传更新报告
    uploadReport(params: any) {
        return Request.postJson('/admin/report/updateReport',params)
    },
    /**
     * 获取地址列表
     * */
    getAddressList(params: any) {
        return Request.getJson('/admin/address/getList',params).then(res => {
            if (res.status === 'ok') {
                res.data.forEach((item: AddressInfo) => {
                    item.addressFullName = item.addressProvince + item.addressCity + item.addressCountry + item.addressDetailed
                })
            }
            return res.data
        })
    },
    /**
     * 删除地址
    */
    deleteAddress(params: any) {
        return Request.postFormData('/admin/address/deleteAddress',params)
    },
    /**
     * 快递下单
     * */
    getPickupOrderReceive(params: any) {
        return Request.postJson('/jd/getPickupOrderReceive',params).then(res=> {
            if (res.status === 'ok') {
                const receivepickuporderResult = res.data.receivepickuporderResult
                if (receivepickuporderResult.code !== 100) {
                    ElMessage.error(receivepickuporderResult.messsage)
                    return false
                }else {
                    return true
                }
            }
        })
    },
    /**
     * 获取物流轨迹
     * */
    getWaybillTrace(params: any) {
        return Request.postJson('/jd/getWaybillTrace',params)
    },
    /**
     * 创建商户地址
     * */
    addCustomerAddress(params: any) {
        return Request.postJson('/admin/address/addCustomerAddress',params)
    },
}
