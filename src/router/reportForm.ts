const reportFormList = () => import(/* webpackChunkName: "reportForm" */ '@/views/reportForm/reportFormList/index.vue')

export default  [
    {
        path: "/reportFormList",
        name: 'reportFormList',
        component: reportFormList // 报表列表
    },
]