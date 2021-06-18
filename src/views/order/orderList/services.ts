import {CustomerType, CustomerTypeValue} from "@/views/order/orderList/interface";
import {ValueLabel} from "@/views/service";
import http from "@/api";

// 客户类型
export const customerTypes: CustomerType[] = [
    {label: '个人', value: 0},
    {label: '企业', value: 1},
]

// 报价状态
export const quotationStatus: CustomerType[] = [
    {label: '未上传', value: 0},
    {label: '已上传', value: 1},
]


// 申请表状态
export const applicationStatus: CustomerType[] = [
    {label: '未上传', value: 0},
    {label: '已上传', value: 1},
]

// 合同状态
export const contractStatus: ValueLabel[] = [
    {label: '未上传', value: 0},
    {label: '待审核', value: 1},
    {label: '审核通过', value: 2},
    {label: '审核拒绝', value: 3},
    {label: '已确认', value: 5},
]
// 获取合同状态label
export const getStatusText = (value: any) => {
    const item = contractStatus.find(item => item.value === value)
    if (item) {
        return item.label
    }
}

// 订单状态
export const expressStatus: ValueLabel[] = [
    {label: '待下单', value: 0},
    {label: '已下单', value: 1},
    {label: '已签收样品', value: 2},
]

// 订单状态
export const orderExpressStatus: ValueLabel[] = [
    {label: '已揽件', value: 1},
    {label: '运输中', value: 2},
    {label: '已签收', value: 3},
]

// 支付状态
export const payStatus: ValueLabel[] = [
    {label: '待支付', value: 0},
    {label: '已支付', value: 1},
]

// 报告状态
export const reportStatus: ValueLabel[] = [
    {label: '待上传', value: 0},
    {label: '已上传', value: 1},
]

export const getCustomerTypeLabel = (value: CustomerTypeValue) => {
    const customerType  = customerTypes.find((item: CustomerType) => item.value === value)
    if (customerType) {
        customerType.label
    }
}

// pdf查看文件
export function handleViewFile(url: string) {
    const params ={
        filePath: url
    }
    http.getSignUrl(params).then(res => {
        if (res.code === 200 && res.data) {
            window.open(res.data)
        }
    })
}