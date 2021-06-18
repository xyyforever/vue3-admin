import {defineComponent, onMounted, ref} from "vue";
import { EluiChinaAreaDht } from 'elui-china-area-dht'
import {ElMessage} from "element-plus";
import api from "@/views/order/api";
import {OrderInfoType} from "@/views/order/orderList/interface";
import {useForm} from "@/views/order/orderList/components/addAddress/form";

/**
 * 添加地址弹框
 * author xyy
 */
export default defineComponent({
    name: 'AddAddress',
    components: {
        EluiChinaAreaDht,
    },
    props: {
        dialog: {
            type: Object
        },
        orderInfo: {
            type: Object
        }
    },
    setup(props:any, {emit}) {
        const orderInfo: OrderInfoType =props.orderInfo
        const formRef = ref()
        const {formData, handleFormChange} = useForm()
        const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat
        onMounted(() => {
            handleFormChange({customerName: orderInfo.customerName})
        })
        return {
            formRef,
            formData,
            handleDialogClose: () => {
                emit('close');
            },
            handleDialogConfirm: () => {
                formRef.value.validate((val: boolean) => {
                    if (!val) return
                    ElMessage.closeAll()
                    const params: any = formData.form
                    params.customerNo = orderInfo.customerNo
                    delete params.customerName
                    api.addCustomerAddress(params).then(res => {
                        if (res.status === 'ok') {
                            emit('close', true) // 关闭后刷新
                            ElMessage.success('添加成功')
                        } else {
                            ElMessage.error(res.message)
                        }
                    })
                })
            },
            handleAddressOnChange: (address: string[]) => {
                const data = {
                    addressProvince: chinaData[address[0]].label,
                    addressCity: chinaData[address[1]].label,
                    addressCountry: chinaData[address[2]].label
                }
                handleFormChange(data)
            }
        }
    }
})