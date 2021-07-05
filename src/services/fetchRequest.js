/* eslint-disable import/no-extraneous-dependencies */
import { gotoLogin } from './utils';
import axios from 'axios';
import { message } from 'antd';

export default function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    return axios({
      url,
      withCredentials: true,
      ...options,
    })
      .then(response => {
        const { data } = response;
        if (data.code === 302 || data.code === 11000) {
          gotoLogin();
          return resolve(data);
        }
        return resolve(data);
      })
      .catch(response => {
        const { data } = response;
        message.error(`操作失败：${(data && (data.msg || data.errMsg)) || '网络错误，请重试'}`);
        return reject(response);
      });
  });
}
