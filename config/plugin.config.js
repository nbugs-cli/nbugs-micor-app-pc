export default config => {
  if (
    process.env.APP_TYPE === "site" ||
    process.env.NODE_ENV !== "production"
  ) {
    config.optimization
      .runtimeChunk(false) // share the same chunks across different modules
      .splitChunks({
        chunks: "async",
        maxInitialRequests: Infinity,
        minSize: 30000,
        minChunks: 2,
        cacheGroups: {
          vendors: {
            // 基本框架
            name: "vendors",
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
            priority: 10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      });
    config
      .plugin("replace")
      .use(require("webpack").ContextReplacementPlugin)
      .tap(() => {
        return [/moment[/\\]locale$/, /zh-cn/];
      });
  } else {
    // share the same chunks across different modules

    config.optimization.runtimeChunk(false).splitChunks({
      chunks: "async",
      name: "vendors",
      maxInitialRequests: Infinity,
      minSize: 30000,
      minChunks: 2,
      cacheGroups: {
        vendors: {
          // 基本框架
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
        },

        antdesigns: {
          name: "antdesigns",
          chunks: "all",
          test: /[\\/]node_modules[\\/](@ant-design|antd|antd-mobile)[\\/]/,
          priority: 11
        },
        "async-commons": {
          // 其余异步加载包
          chunks: "async",
          minChunks: 2,
          name: "async-commons",
          priority: 9,
          reuseExistingChunk: true
        }
      }
    });
    config
      .plugin("replace")
      .use(require("webpack").ContextReplacementPlugin)
      .tap(() => {
        return [/moment[/\\]locale$/, /zh-cn/];
      });
  }
};
