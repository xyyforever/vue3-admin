const Login = () => import(/* webpackChunkName: "entry" */ '@/views/home/login.vue')
const Home = () => import(/* webpackChunkName: "entry" */ '@/views/home/index.vue')
import merchant from './merchant'
import order from './order'
import report from './report'
import customer from './customer'
import marketing from './marketing'
import finance from './finance'
import reportForm from './reportForm'
import system from './system'

export default [
    {
        path: '/',
        redirect: {
            path: '/login'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            ...merchant,
            ...order,
            ...report,
            ...customer,
            ...marketing,
            ...finance,
            ...reportForm,
            ...system,
        ]
    }
]
