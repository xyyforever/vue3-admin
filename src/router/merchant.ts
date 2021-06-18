const merchantList = () => import(/* webpackChunkName: "merchant" */ '@/views/merchant/merchantList/index.vue')

export default  [
    {
        path: "/merchantList",
        name: 'merchantList',
        component: merchantList // 商户列表
    },
    {
        path: "/merchantList/merchantDetail",
        name: 'merchantDetail',
        component: merchantList // 商户详情
    },
]