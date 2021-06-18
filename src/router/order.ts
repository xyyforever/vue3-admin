const orderList = () => import(/* webpackChunkName: "order" */ '@/views/order/orderList/index.vue')

export default  [
    {
        path: "/orderList",
        name: 'orderList',
        component: orderList // 订单列表
    },
]