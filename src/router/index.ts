import { createRouter, createWebHistory } from 'vue-router'
import routes from './entry'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {Menus} from "@/views/home/Menus";
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由加载前
router.beforeEach((to, from, next) => {
  NProgress.configure({ showSpinner: false });
  if (to.meta.title) NProgress.start();
  console.log(to, 'to')
  next()
});

// 路由加载后
router.afterEach(() => {
  NProgress.done();
});

export default router
