/* eslint-disable import/prefer-default-export */
export const ENV = (
  document.querySelector('meta[name="x-server-env"]') || { content: "dev" }
).content;

export const gotoLogin = (path, isSelect) => {
  window.location.href = `http${
    ENV === "production" ? "s://login" : "://login-test"
  }.xiaoyuanhao.com/${
    !isSelect ? "user/login" : "select"
  }?destination=${encodeURIComponent(path || `${window.location.origin}/`)}`;
};

export function GetQueryString(name) {
  const regArr = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(regArr);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}

export const transformSemesterName = (semester ={}) =>
  `${semester.semesterYear}${
    {
      1: "春季学期",
      2: "秋季学期"
    }[semester.semesterType]
  }`;
