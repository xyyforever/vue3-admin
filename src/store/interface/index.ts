// 接口类型声明

// 布局配置
export interface ThemeConfigState {
	globalTitle: string;
	currentMenu: CurrentMenu;
}

export interface CurrentMenu {
	firstTitle?: string;
	secondTitle?: string;
	thirdTitle?: string;
	thirdPath?: string;
}
// 用户信息
export interface UserInfosState {
	userInfos: object;
}

// 主接口(顶级类型声明)
export interface RootStateTypes {
	themeConfig: ThemeConfigState;
	userInfos: UserInfosState;
}
