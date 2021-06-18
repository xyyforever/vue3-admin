const reportList = () => import(/* webpackChunkName: "report" */ '@/views/report/reportList/index.vue')

export default  [
    {
        path: "/reportList",
        name: 'reportList',
        component: reportList // 报告列表
    },
]