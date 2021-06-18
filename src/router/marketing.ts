const marketingList = () => import(/* webpackChunkName: "marketing" */ '@/views/marketing/marketingList/index.vue')

export default  [
    {
        path: "/marketingList",
        name: 'marketingList',
        component: marketingList // 营销列表
    },
]