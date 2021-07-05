import store from 'store2';
import { stringify } from 'qs';
import request from './request';
import { url } from './service-utils';

export async function queryCurrent() {
  const data = {
    schoolId: store.session('user-orgId'),
  };

  return request(`${url.auth}/getXyhUser?${stringify(data)}`);
}

export async function queryUserInfo() {
  return request(`${url.user}/login/userinfo`);
}

export async function fetchIsContact(params) {
  return request(`${url.authWorkApi}/wxauth/use/work/contact?${stringify(params)}`);
}

