import {reactive} from "vue";
import {AddressForm} from "@/views/order/orderList/components/addAddress/interface";

export function useForm() {
    const formData = reactive({
        form: {} as AddressForm
    })

    const handleFormChange = (data: any) => {
        Object.assign(formData.form, data)
    }

    return {
        formData,
        handleFormChange,
    }
}
