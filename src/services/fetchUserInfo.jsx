import request from '@/services/request';

let isFetching = false;
let userInfo = null;
const callbacks = [];

let api;
const env = document.querySelector('meta[name=x-server-env]').content;
if (env === 'test') {
  api = '//aly-test.api.xiaoyuanhao.com/sh-user-center-test';
} else if (env === 'production') {
  api = '//user.api.xiaoyuanhao.com';
} else if (env === 'dev') {
  api = '//aly-test.api.xiaoyuanhao.com/sh-user-center-test';
}

// 获取用户信息
export function getUserInfo(callback) {
  if (window.getUserInfoLoading === true) {
    window.getUserInfoCallBack.push(() => getUserInfo(callback));
    return;
  }

  if (userInfo) {
    return callback(userInfo);
  }

  callbacks.push(callback);

  if (!isFetching) {
    isFetching = true;
    // 备注登陆接口  正式环境 `//user.api.xiaoyuanhao.com/internal`   测试环境 `/api/usercenter`

    request(
      `${api}/login/userinfo`,
      {
        method: 'get',
        header: {
          Cookie: document.cookie,
        },
      }
    ).then(
      data => {
        userInfo = data;
        for (const cb of callbacks) {
          cb(data);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
