import request from './request';
import { url } from './service-utils';

/**
 * service示例
 */
export function getMenuData() {
  return request(`${url.menu}/userMenu/get`);
}

export const a = 1;

// 若是企微内核浏览器 => 若是mac或windows系统浏览 返回true
export const handleUserAgent = () => {
  const ua = navigator.userAgent;
  return (
    /micromessenger|wxwork/i.test(ua) &&
    /mac|windows/i.test(ua)
  );
}

// 添加历史记录
export async function putOperation(params) {
  return request(`${url.workbenchApi}/portal/recent/operation/`, {
  method:"put",
  data:params
   });
  }
