import { stringify } from "qs";
import request from "./request";
import { url } from "./service-utils";

/**
 * 获取时间安排列表
 */
export function getTimeSettingsList(params) {
  return request(`${url.afterclass}/time/list?${stringify(params)}`);
}

/**
 * 新增/修改时间安排
 */
export function addTimeSettings(params) {
  return request(`${url.afterclass}/time/add`, {
    method: "POST",
    data: params
  });
}

/**
 * 删除时间安排
 */
export function deleteTimeSettings(params) {
  return request(`${url.afterclass}/time/delete?${stringify(params)}`, {
    method: "POST",
  });
}

/**
 * 获取全部时间安排列表(不分页 )
 */
 export function getTimeSettingsAllList(params) {
  return request(`${url.afterclass}/time/allList?${stringify(params)}`);
}
