<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="3">
            <h3 class="logo">
              <span style="margin-left:10px">{{ $store.state.themeConfig.globalTitle }}</span>
            </h3>
          </el-col>
          <el-col :span="12">
            <el-button
                v-for="(item, index) in Menus"
                :key="index"
                :type="firstTitle === item.firstTitle ? 'primary' : undefined"
                @click="handleMenusClick(item.id)"
            >{{ item.firstTitle }}
            </el-button>
          </el-col>
          <el-col :span="9">
            <div class="loginOut">
              <span>
                <i class="iconfont icon-shuaxin"></i>
                刷新
              </span>
              <span>
                <i class="iconfont icon-tuichu"></i>
                退出
              </span>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <!-- 侧边栏模块 -->
        <SliderItem v-if="showSliderItem"/>
        <el-main>
          <el-breadcrumb separator="|" v-if="showSliderItem">
            <el-breadcrumb-item>{{ $store.state.themeConfig.currentMenu.firstTitle }}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="secondTitle">{{ secondTitle }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="content">
            <!-- 现实home的子路由的出口 -->
            <router-view/>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import SliderItem from "./silderItem/index.vue"
import {ElMessageBox, ElMessage} from 'element-plus';
import {reactive, onMounted, toRefs, computed} from "vue";
import {getCurrentMenuTitle, Menus} from "@/views/home/Menus";
import { useRouter } from 'vue-router';
import {store} from "@/store";
export default {
  name: 'Home',
  components: {
    SliderItem
  },
  setup() {
    const route:any = useRouter()
    const routePath = route.currentRoute.value.path
    const state = reactive({
      Menus,
      firstTitle: '',
      showSliderItem: false,
    })
    const secondTitle = computed(() => {
      return store.state.themeConfig.currentMenu.secondTitle
    });
    const handleMenusClick = (id: any) => {
      const item: any = state.Menus.find(item => item.id === id)
      state.firstTitle = item.firstTitle
      // 设置当前菜单
      store.dispatch('themeConfig/setCurrentMenu', {firstTitle: item.firstTitle})
    }
    const logout = () => {
      // 弹出消息框
      ElMessageBox.confirm("你确定要退出吗?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
      // 清除本地的token
      localStorage.removeItem("token");
      // 跳转到登录页
      // router.push("/login");
      ElMessage.success("退出成功");
    };
    onMounted(() => {
      // 设置当前菜单
      console.log(route.currentRoute.value, 'route')
      // 如果是首页
      if (routePath === '/home') {
        store.dispatch('themeConfig/setCurrentMenu', {firstTitle: Menus[0].firstTitle})
        state.firstTitle = Menus[0].firstTitle
        state.showSliderItem = true
      } else {
        const menu = getCurrentMenuTitle(routePath)
        console.log(menu, 'menu')
        state.firstTitle = menu.firstTitle
        store.dispatch('themeConfig/setCurrentMenu', menu)
        console.log(store.state.themeConfig, 'title')
        state.showSliderItem = true
      }
    })
    return {
      secondTitle,
      ...toRefs(state),
      handleMenusClick
    }
  },
};
</script>
<style lang="scss" src="./index.scss" scoped></style>
