/* eslint-disable import/prefer-default-export */
const ENV = (
  document.querySelector('meta[name="x-server-env"]') || { content: "dev" }
).content;

const urlCollect = {
  // 开发环境
  dev: {
    mock: "/mock",
    afterclass: "//txy-test.api.xiaoyuanhao.com/yunzhi-after-class-test/web", // 课后服务
    fileApi: "//file.xiaoyuanhao.com",
    workbenchApi:
      "//aly-test.api.xiaoyuanhao.com/yunzhi-xiaoyuanhao-portal-test/web" // 门户
  },
  // 测试环境
  test: {
    mock: "/mock",
    afterclass: "//txy-test.api.xiaoyuanhao.com/yunzhi-after-class-test/web", // 课后服务
    fileApi: "//file.xiaoyuanhao.com",
    workbenchApi:
      "//aly-test.api.xiaoyuanhao.com/yunzhi-xiaoyuanhao-portal-test/web" // 门户
  },
  // 生产环境
  production: {
    mock: "/mock",
    afterclass: "//yunzhi-after-class.api.xiaoyuanhao.com/web", // 课后服务
    fileApi: "//file.xiaoyuanhao.com",
    workbenchApi: "//yunzhi-xiaoyuanhao-portal.api.xiaoyuanhao.com/web" // 门户
  }
};

export const url = urlCollect[ENV];
