import afterclass from "./demo";

export default [
  {
    path: "/",
    component: "../layouts/BasicLayout",
    Routes: ["src/pages/Authorized"],
    routes: [
      afterclass,
      {
        component: "./Home/404"
      }
    ]
  }
];
