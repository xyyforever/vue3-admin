export interface AddressForm {
    addressName: string, // 联系人
    addressMobile: string, // 联系手机
    addressProvince: string, // 省
    addressCity: string, // 市
    addressCountry: string, // 区
    addressDetailed: string, // 详细地址
    customerName?: string, // 公司名称 || 客户名称
    isDefault: number, // 是否默认 0否1是
    customerNo?: string, // 客户ID
    merchantNo?: string, // 商户ID
}