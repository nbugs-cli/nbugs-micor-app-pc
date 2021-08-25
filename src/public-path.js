const { version, name } = require("../package.json");

const ENV = (
  document.querySelector('meta[name="x-server-env"]') || { content: "dev" }
).content;

const getPublishPath = () => {
  switch (ENV) {
    case "pre":
      return `//cdn.xiaoyuanhao.com/pre/${name}/${version}/`;
    case "test":
      return `//cdn.xiaoyuanhao.com/test/${name}/${version}/`;
    case "production":
      return `//s.xiaoyuanhao.com/${name}/${version}/`;
    default:
      return "/";
  }
};

// eslint-disable-next-line no-underscore-dangle
if (window.__POWERED_BY_QIANKUN__) {
  if (process.env.NODE_ENV === "production") {
    // window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ ="//cdn.xiaoyuanhao.com/test/nbugs-web-cooperative-office-manage/0.0.1/";
    // eslint-disable-next-line
    __webpack_public_path__ = getPublishPath(); // 使用 webpack 运行时 publicPath 配置, 参考 https://qiankun.umijs.org/zh/faq#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%BE%AE%E5%BA%94%E7%94%A8%E5%8A%A0%E8%BD%BD%E7%9A%84%E8%B5%84%E6%BA%90%E4%BC%9A-404%EF%BC%9F
  }
}
