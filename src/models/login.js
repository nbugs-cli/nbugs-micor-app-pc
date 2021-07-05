/* eslint-disable no-undef,import/order,import/no-extraneous-dependencies,import/extensions */
import { history } from 'umi';
import { logout, sendCode, modifyPwd } from '@/services/login';
import { queryCurrent } from '@/services/user';
import store from 'store2';
import { message } from 'antd';
import { parse } from 'qs';
import { gotoLogin } from '../services/utils';

const hostName = global.location.hostname;

const initState = {
  index: 0,
  defaultActiveKey: hostName === 'haizhu.quxianhao.com' ? 'scan' : 'account',
  errorFlag: false,
  errorData: '',
  formData: {
    code: '',
    phoneNumber: '',
    newPassword: '',
    repeatNewPassword: ''
  }
};

export default {
  namespace: 'login',
  state: initState,
  effects: {
    *logout(_, { call }) {
      yield call(logout) || {};
      message.success('退出成功');
      gotoLogin();
    },
    *gotoHomeIfHasUserInfo(_, { call }) {
      try {
        yield call(queryCurrent);
        // 扫码登录后，回跳回来的时候，url中会带orgid，这里需要模拟选择学校
        const { orgid } = parse(window.location.search.slice(1));
        store.session('user-orgId', orgid);
        history.replace('/');
      } catch (error) {
        console.log(error);
      }
    },

    *switchCard({ index }, { put }) {
      yield put({
        type: 'saveState',
        payload: {
          index
        },
      });
    },

    *sendCode({ phoneNumber }, { call }) {
      const response = yield call(sendCode, {
        mobile: phoneNumber,
      });
      if (response.code === 200 || response.code === 0) {
        message.success('验证码已发送，请注意接收');
      } else {
        message.error(response.msg);
      }
    },

    *modifyPwd(payload, { call, put }) {
      const response = yield call(modifyPwd, {
        code: payload.code,
        passId: payload.passId,
        password: payload.password,
      });
      if (response.code === 200 || response.code === 0) {
        message.success('修改成功');
        yield put({
          type: 'resetFormData'
        });
        yield put({
          type: 'saveState',
          payload: {
            index: 0
          },
        });
      } else {
        message.error(response.msg);
        yield put({
          type: 'saveState',
          payload: {
            index: 1
          },
        });
      }
    }
  },

  reducers: {
    saveFormData(state, { formData }) {
      return {
        ...state,
        formData: Object.assign({}, state.formData, formData),
      };
    },
    resetFormData(state) {
      return {
        ...state,
        formData: initState.formData,
      };
    },
    saveState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
