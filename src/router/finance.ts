const financeList = () => import(/* webpackChunkName: "finance" */ '@/views/finance/financeList/index.vue')

export default  [
    {
        path: "/financeList",
        name: 'financeList',
        component: financeList // 财务列表
    },
]