import os from "os";
import pageRoutes from "./router.config";
import defaultSettings from "../src/defaultSettings";
import webpackPlugin from "./plugin.config";
import slash from "slash2";

const { version, name } = require("../package.json");

const { pwa, primaryColor } = defaultSettings;
const { APP_TYPE, TEST } = process.env;

// 针对 preview.pro.ant.design 的 GA 统计代码
// 业务上不需要这个
// if (APP_TYPE === 'site') {
//   plugins.push([
//     'umi-plugin-ga',
//     {
//       code: 'UA-72788897-6',
//     },
//   ]);
// }

const getPublishPath = env => {
  console.log(`${name}:${version}`);

  switch (env.BUILD_ENV) {
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

const getTrunks = env => {
  if (env.APP_TYPE !== "site") {
    return ["umi", "vendors", "antdesigns", "async-commons"];
  } else {
    return ["umi", "vendors"];
  }
};

export default {
  devtool: false,
  esbuild: {},
  publicPath: getPublishPath(process.env),
  base: "/",
  antd: {},
  dva: {
    hmr: true
  },
  nodeModulesTransform: {
    type: "none",
    exclude: []
  },
  fastRefresh: {},
  chunks: getTrunks(process.env),

  locale: {
    default: "zh-CN",
    baseNavigator: true
  },
  dynamicImport: {
    loading: "@/antd-pro-components/PageLoading/index"
  },
  qiankun: {
    slave: {}
  },
  pwa: false,
  // pwa: pwa
  //   ? {
  //     workboxPluginMode: 'InjectManifest',
  //     workboxOptions: {
  //       importWorkboxFrom: 'local',
  //     },
  //   }
  //   : false,
  ...(!TEST && os.platform() === "darwin"
    ? {
        hardSource: false
      }
    : {}),
  define: {
    APP_TYPE: APP_TYPE || ""
  },
  targets: {
    ie: 9,
    edge: 9
  },
  // 路由配置
  routes: pageRoutes,
  theme: {
    "primary-color": primaryColor
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true
  },
  cssLoader: {
    // 这里的 modules 可以接受 getLocalIdent
    modules: {
      getLocalIdent: (context, localIdentName, localName) => {
        if (
          context.resourcePath.includes("node_modules") ||
          context.resourcePath.includes("ant.design.pro.less") ||
          context.resourcePath.includes("global.less")
        ) {
          return localName;
        }
        const match = context.resourcePath.match(/src(.*)/);
        if (match && match[1]) {
          const antdProPath = match[1].replace(".less", "");
          const arr = slash(antdProPath)
            .split("/")
            .map(a => a.replace(/([A-Z])/g, "-$1"))
            .map(a => a.toLowerCase());
          return `antd-pro${arr.join("-")}-${localName}`.replace(/--/g, "-");
        }
        return localName;
      }
    }
  },
  manifest: {
    basePath: "/"
  },
  chainWebpack: webpackPlugin

  // extraBabelIncludes: [
  //   '/node_modules/dnd-core',
  //   '/node_modules/react-dnd',
  //   '/node_modules/react-dnd-html5-backend',
  // ],
};
