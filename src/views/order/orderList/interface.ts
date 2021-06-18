
export type CustomerTypeValue = 0 | 1

export interface CustomerType {
    label: string
    value: CustomerTypeValue
}

/**
 *搜索参数
 */
export interface SearchParams {
    orderNo?: string,
    customerName?: string,// 客户名称
    phone?: string,// 联系手机
    customerType?: number,// 客户类型
    sellerName?: string,// 售卖商户
    testRequirement?: string, // 检查对象
    createName?: string, // 创建人
    createTime?: string[], //创建时间
    startTime?: string,
    endTime?: string,
    pageNum?: number,
    pageSize?: number,
    quotationState?:number, // 报价单状态
    applicationState?:number,// 申请表状态
    contractState?:number,// 合同状态
    logisticsState?:number,// 物流状态
    payState?:number,// 支付状态
    reportState?:number,// 报告状态
}

/**
 * 订单信息
 */
export interface OrderInfoType {
    orderNo: string,// 订单编号
    customerNo?: number, // 客户id
    customerName: string,// 客户名称
    contacts: string,// 联系人
    phone: string,// 联系手机
    sellerName: string,// 售卖商户
    testRequirement: string, // 检查对象
    orderPrice: string, // 订单金额
    createName: string, // 创建人
    createTime: string, // 创建时间
    requireId?: string, //检测需求ID

    testMethod?: string, // 检测方法
    reportQualifications?: string, // 报告资质
    reportLanguage?: string, // 报告语言
    testReason?: string, // 检测目的

    reportId?: string, // 报告Id
    reportState?: string, // 报告状态
    contractId?: string, // 合同Id
    contractState?: string, // 合同状态
    quotationId?: string, // 报价单Id
    quotationState?: string, // 报价单状态
    applicationId?: string, // 申请表Id


    applicationState?: string, // 申请表状态

    logisticsState?: number, // 物流状态
    payState?: string, // 支付状态
}


/**
 * 报价单信息
 */
export interface QuotationInfo {
    id: number,
    quotationPrice: number, // 报价金额
    createTime: string, // 报价时间
    quotationName: string, // 报价单名称
    createName: string, // 操作人
    fileUrl: string, // 文件地址
    fileName: string, // 文件名
}

/**
 * 申请表信息
 */
export interface ApplicationInfo {
    id: number, // 申请单编号
    applicationName: string, // 申请单名称
    createTime: string, // 创建时间
    createName?: string, // 创建人
    orderNo?: string, // 关联订单号
    fileName?: string, // 文件名称
    fileUrl?: string, // 文件地址
}


/**
 * 申请表信息
 */
export interface ReportInfo {
    id: number, // 报告编号
    reportNo: string, // 报告流水号
    createTime: string, // 创建时间
    createName?: string, // 创建人
    idDelete?: number, // 是否删除
    orderNo?: string, // 关联订单号
    fileName?: string, // 文件名称
    fileUrl?: string, // 文件地址
}

/**
 * 合同信息
 */
export interface ContractInfo {
    id: number, // 合同编号
    contractName: string, // 合同名称
    contractState: string, // 合同状态
    fileUrl: string, // 关联文件ID
    fileName?: string, // 关联文件ID
    auditReasons: string, // 审核说明
    orderNo: string, // 关联订单编号
    createTime?: string, // 创建时间
    createName?: string, // 创建人
    statusText?: string, // 状态文本
}
/**
 * 物流信息
 */
export interface ExpressInfo {
    logisticsOrderId: number, // 物流订单Id
    orderNo: string, // 关联订单编号
    paackNo: string, // 物流单号
    logisticsName: string, // 物流公司
    logisticsState: string, // 物流状态
    sendName: string, // 寄件人
    sendMobile: string, // 寄件人手机
    sendProvince: string, // 寄件人省
    sendCity: string, // 寄件人市
    sendCountry: string, // 寄件人区
    sendAddress: string, // 寄件人地址

    createTime?: string, // 创建时间
    createName?: string, // 创建人
    statusText?: string, // 状态文本
}

/**
 * 地址信息
 */
export interface AddressInfo {
    addressCity: string, // 市
    addressCountry: string, // 区
    addressProvince: string, // 省
    addressDetailed: string, // 详细地址
    addressName: string, // 姓名
    addressMobile: string, // 手机号
    addressFullName: string, // 省市区全称
}