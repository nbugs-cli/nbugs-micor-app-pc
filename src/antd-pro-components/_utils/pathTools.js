import qs from "qs";
// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
const extraUrl = [
  "teacherEvaluation",
  "worksDisplay",
  "studentEvaluation",
  "signUp",
  "interaction",
  "moralEduSchool",
  "moralEducation",
  "dataFill",
  "workFlow",
];

// 获取特殊的路由，需要通过appId来高亮相应的菜单item
export function isExtraUrl(url) {
  let flag = false;
  extraUrl.forEach(item => {
    if (url.indexOf(item) > -1) {
      flag = true;
    }
  });
  return flag;
}

// eslint-disable-next-line import/prefer-default-export
export function urlToList(location) {
  const { pathname, search } = location;
  const params = qs.parse(search, { ignoreQueryPrefix: true });
  const { appId = "", workFlowTypeId = "", flowCode = "" } = params;
  const urllist = pathname.split("/").filter(i => i);
  return urllist.map((urlItem, index) => {
     // 第一项为/，需要给出第一个数组项的项添加appid等参数，用于后续匹配
     if (index > 0 && isExtraUrl(pathname)) {
      const append = () => {
        if (appId) {
          return `?appId=${appId}`;
        }
        if (workFlowTypeId) {
          return `?workFlowTypeId=${workFlowTypeId}`;
        }
        if (flowCode) {
          return `?flowCode=${flowCode}`;
        }
        return "";
      };
      return `/${urllist.slice(0, index + 1).join("/")}${append()}`;
    }
      // let query = "?";
      // query += appId ? `appId=${appId}` : "";
      // // query += parentMenu ? `parentMenu=${parentMenu}` : "";
      // return `/${urllist.slice(0, index + 1).join("/")}${query}`;
    return `/${urllist.slice(0, index + 1).join("/")}`;
  });
}
