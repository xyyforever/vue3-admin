const systemList = () => import(/* webpackChunkName: "system" */ '@/views/system/systemList/index.vue')

export default  [
    {
        path: "/systemList",
        name: 'systemList',
        component: systemList // 系统列表
    },
]