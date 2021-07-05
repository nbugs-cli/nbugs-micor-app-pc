import demo from "./demo";

export default [
  {
    path: "/",
    component: "../layouts/BasicLayout",
    Routes: ["src/pages/Authorized"],
    routes: [
      {
        breadcrumbName: "首页",
        path: "/",
        component: "./Home/Index/index"
      },
      demo,
      {
        component: "./Home/404"
      }
    ]
  }
];
