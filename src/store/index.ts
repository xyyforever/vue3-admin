import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { RootStateTypes } from './interface/index';
import themeConfig from './modules/themeConfig';

export const key: InjectionKey<Store<RootStateTypes>> = Symbol();

export const store = createStore<RootStateTypes>({
  modules: {
    themeConfig,
  },
});

export function useStore() {
  return baseUseStore(key);
}
