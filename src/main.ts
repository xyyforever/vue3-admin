import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store';
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import './assets/scss/app.scss'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'


const app = createApp(App)
window.$version = {
  vue: app.version,
  ele: ElementPlus.version
}

app.use(router)
  .use(store, key)
  .use(ElementPlus, { locale })
  .mount('#app')
