const customerList = () => import(/* webpackChunkName: "customer" */ '@/views/customer/customerList/index.vue')

export default  [
    {
        path: "/customerList",
        name: 'customerList',
        component: customerList // 客户列表
    },
]