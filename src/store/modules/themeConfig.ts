import {Module} from 'vuex';
import {ThemeConfigState, RootStateTypes} from '../interface/index';

const themeConfigModule: Module<ThemeConfigState, RootStateTypes> = {
    namespaced: true,
    state: {
        // 网站主标题（菜单导航、浏览器当前网页标题）
        globalTitle: '百检运营管理系统',
        currentMenu: {},
    },
    mutations: {
        // 设置当前菜单
        getCurrentMenu(state: any, data: object) {
            state.currentMenu = data;
        },
    },
    actions: {
        // 设置当前菜单
        setCurrentMenu({commit}, menu) {
            commit('getCurrentMenu', menu);
        },
    },
};

export default themeConfigModule;
