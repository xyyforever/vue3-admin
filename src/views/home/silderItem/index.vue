<template>
  <el-aside width="200px">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        active-text-color="#E90001"
        :default-openeds="[secondIndex]"
        unique-opened
        router
    >
      <el-submenu
          v-for="(item, index) in secondMenus"
          :key="index"
          :index="String(index)"
      >
        <template #title>
          <i :class="item.icon" v-if="item.icon"></i>
          <span>{{item.secondTitle}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
              v-for="(item1, index1) in item.child"
              :key="index1"
              :index="item1.url"
              @click="handleClickThirdMenu(item1.url)"
          >{{ item1.thirdTitle }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';
import {store} from "@/store";
import {getCurrentMenuTitle, getSecondMenus, getThirdMenus} from "@/views/home/Menus";
/**
 * 侧边栏
 * 2021年6月3日
 * author xyy
 */
export default defineComponent({
      name: 'SliderItem',
      setup() {
        const secondMenus: any[] = computed(() => {
          return getSecondMenus(store.state.themeConfig.currentMenu.firstTitle)
        });
        const secondIndex: any[] = computed(() => {
          const currentMenu = store.state.themeConfig.currentMenu
          const secondMenus = getSecondMenus(currentMenu.firstTitle)
          if (currentMenu.secondMenus) {
            return secondMenus.findIndex(item => item.secondMenus === currentMenu.secondMenus)
          } else {
            return 0
          }
        });
        const activeIndex: any[] = computed(() => {
          const thirdPath = store.state.themeConfig.currentMenu.thirdPath
          if (thirdPath) {
            return thirdPath
          }
        });
        const handleClickThirdMenu = (routePath) => {
          const menu = getCurrentMenuTitle(routePath)
          console.log(menu, 'menu')
          store.dispatch('themeConfig/setCurrentMenu', menu)
        }
        return {
          activeIndex,
          secondIndex,
          secondMenus,
          handleClickThirdMenu
        };
      },
    }
)
</script>

<style lang="scss" src="./index.scss" scoped></style>
