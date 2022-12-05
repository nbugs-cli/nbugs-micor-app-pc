import pathToRegexp from "path-to-regexp";
import { urlToList, isExtraUrl } from "../_utils/pathTools";

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */
export const getFlatMenuKeys = menuData => {
  let keys = [];
  menuData.forEach(item => {
    keys.push(item.path);
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
  });
  return keys;
};

export const getMenuMatches = (flatMenuKeys, path) => {
  return flatMenuKeys.filter(item => {
    if (item) {
      // 如果不是需要额外做处理的路由，将其query删除后再正则校验
      return pathToRegexp(
        isExtraUrl(window.location.pathname) ? item : item.split("?")[0]
      ).test(path);
    }
    return false;
  });
};
/**
 * 获得菜单子节点
 * @memberof SiderMenu
 */
export const getDefaultCollapsedSubMenus = props => {
  const { location, flatMenuKeys } = props;
  return urlToList(location)
    .map(item => getMenuMatches(flatMenuKeys, item)[0])
    .filter(item => item)
    .reduce((acc, curr) => [...acc, curr], ["/"]);
};
