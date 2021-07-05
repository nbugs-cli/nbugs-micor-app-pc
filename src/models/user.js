import store from 'store2';
import { queryCurrent } from '@/services/user';
import { ENV, funVerifySuccess } from '@/services/utils';

const getInitState = () => ({
  list: [],
  currentUser: {},
});

export default {
  namespace: 'user',

  state: getInitState(),

  effects: {
    *fetchCurrent(_, { call, put }) {
      const { users = [], orgName, orgId, enOrgType, homeUrl } = yield call(queryCurrent);

      // if (ENV === 'production' && funVerifySuccess() && !window.dynamicSwitch) {
      //   if (window.funHomeUrl) {
      //     window.funHomeUrl()
      //   }

      //   if (!homeUrl) {
      //     window.location.href = 'https://t.xiaoyuanhao.com';
      //     return !0;
      //   }

      //   const localHref = /^http(s)?:\/\/(.*?)\//.exec(homeUrl || '');
      //   if (localHref && localHref.length >= 3 && localHref[2] !== window.location.hostname) {
      //     window.location.href = homeUrl;
      //     return !0;
      //   }
      // }

      const userInfo = users.find(user => user.userType && user.userType !== '学生');
      const currentUser = {
        schoolName: orgName,
        schoolLogo: `//classpic.oss-cn-hangzhou.aliyuncs.com/avatar/${orgId}.jpg`,
        name: userInfo.userName,
        avatar: '//gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        orgId,
        userInfo,
        enOrgType, // general_school 学校; county_bureau_educ 教育局; central_school 中心校
        orgType: {general_school: 'school', county_bureau_educ: 'county', central_school: 'school'}[enOrgType]
      };

      yield put({
        type: 'save',
        payload: {
          currentUser,
        },
      });

      store.session('currentUser',currentUser);

      return Promise.resolve(currentUser);
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    resetState() {
      return { ...getInitState() };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
