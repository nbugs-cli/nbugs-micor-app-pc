
export default {
  namespace: "global",

  state: {
    collapsed: false,
    notices: [],
    childrenList: []
  },

  effects: {},

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload
      };
    }
  },

  subscriptions: {
    // setup({ history }) {
    // 奕夫注释：historyPathNameArr 变量对应的 util 方法没有被用到，先注释掉。因为如果 history 只 listen 不 unlisten 的话，会导致 router 事件监听出问题。
    // Subscribe history(url) change, trigger `load` action if pathname is `/`
    // return history.listen(({ pathname }) => {
    //   (window.historyPathNameArr = window.historyPathNameArr || []).unshift(pathname);
    // });
    // },
  }
};
