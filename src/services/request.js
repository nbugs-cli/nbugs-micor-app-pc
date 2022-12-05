import axios from "axios";
import { message } from "antd";
import { gotoLogin } from "./utils";

export default async function request(url, options = {}) {
  const {showRejectErr = true} = options;
  return new Promise((resolve, reject) => {
    return axios({
      url,
      withCredentials: true,
      ...options
    })
      .then(response => {
        const {data} = response;

        if (data.code === 200 || data.code === 0 || data.code === "200") {
          return resolve(data.data || data.result);
        }

        if (data.code === 302 || data.code === 11000) {
          gotoLogin();
          return reject(data || {});
        }
        // 导出文件data返回''，传入showRejectErr为false，不弹出错误
        if(showRejectErr || data) {
          message.error(`操作失败：${(data && (data.message || data.msg || data.error || data.errMsg)) || "网络错误，请重试"}`);
        }
        return reject(data || {});
      })
      .catch(error => {
        const {response} = error || {};
        const {data} = response || {};
        return reject(data || {});
      });
  });
}
