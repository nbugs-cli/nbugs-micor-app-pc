const ac = "/demo";
export default {
  breadcrumbName: "测试",
  path: ac,
  routes: [
    {
      path: `${ac}/basic`,
      breadcrumbName: "基础管理",
      routes: [
        {
          path: `${ac}/basic/timeSettings`,
          component: "./TimeSettings",
          breadcrumbName: "课后课节管理"
        }
      ]
    },
    {
      component: "./Home/404"
    }
  ]
};
