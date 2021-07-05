import { history, getDvaApp } from "umi";
import routes from "../config/router.config";

let timer;
// 同步容器的参数到 store 中
function dispatchState(value) {
  const { menus, schools, currentUser, collapsed, activeMenuIndex } = value;
  const gApp = getDvaApp();
  // 获取全局下挂载的 redux store，如果还未初始化，则异步轮询
  // eslint-disable-next-line no-underscore-dangle
  const _store = gApp && gApp._store;
  if (!_store) {
    // eslint-disable-next-line no-unused-expressions
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      dispatchState(value);
    }, 0);
    return;
  }
  // eslint-disable-next-line no-underscore-dangle
  gApp._store.dispatch({
    type: "selectSchools/save",
    payload: { schools }
  });
  // eslint-disable-next-line no-underscore-dangle
  gApp._store.dispatch({
    type: "user/save",
    payload: { currentUser }
  });

  // eslint-disable-next-line no-underscore-dangle
  gApp._store.dispatch({
    type: "menu/setMenuData",
    payload: { menus, routes, collapsed, activeMenuIndex }
  });
  // .then(({ menuData }) => {
  //   // eslint-disable-next-line no-underscore-dangle
  //   gApp._store.dispatch({
  //     type: "global/save",
  //     payload: {
  //       collapsed,
  //       childrenList:
  //         menuData[activeMenuIndex] && menuData[activeMenuIndex].children
  //     }
  //   });
  // });
}
/* eslint-disable import/prefer-default-export */
export const qiankun = {
  master: {
    // 注册子应用信息
    apps: [
      {
        name: "read-statistics", // 唯一 id
        entry: "//localhost:8011", // html entry
        path: "/readStatistics"
      },
      {
        name: "work-flow", // 唯一 id
        entry: "//localhost:8012", // html entry
        path: "/workflow"
      }
    ]
  },
  // slave: {},

  // 应用加载之前
  async bootstrap(props) {
    console.log("oa-manager bootstrap", props);
  },
  // 应用 render 之前触发
  async mount(props) {
    if (!props) return;
    const { MicroApp, onGlobalStateChange } = props;
    if(MicroApp) {
      window._micro_app = MicroApp;
    }
    onGlobalStateChange((value /* , prev */) => {
      console.log("oa-manager onGlobalStateChange", value);
      // 利用 redux 在全局挂载的 g_app.store，dispatch 全局事件。
      if (!getDvaApp) {
        return;
      }
      dispatchState(value);
    }, true);
    console.log("oa-manager mount", props);
    // 应用挂载之后刷新一下，解决 popState 回调函数没有被调用到导致 history 没更新的问题
    // const { pathname, search, hash } = window.location;
    // history.replace(pathname + search + hash);
  },
  // 应用卸载之后触发
  async unmount(props) {
    console.log("oa-manager unmount", props);
  }
};
