import {reactive} from "vue";

export function usePage() {
    const pageData = reactive({
        pageNum: 1,
        pageSize: 10,
        total: 0
    })

    const handlePageChange = (num: number) => {
       pageData.pageNum = num
    }

    const handleTotalChange = (total: number) => {
        pageData.total = total
    }

    return {
        pageData,
        handlePageChange,
        handleTotalChange,
    }
}
