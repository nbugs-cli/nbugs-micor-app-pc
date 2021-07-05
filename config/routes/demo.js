const DEMO = '/demo';
export default {
  breadcrumbName: 'demo',
  path: DEMO,
  routes: [
    {
      path: `${DEMO}/empty`,
      component: './Home/Empty',
      breadcrumbName: 'demo',
    },
    {
      path: `${DEMO}/home`,
      component: './Home/Index',
      breadcrumbName: 'home',
    },
    {
      component: "./Home/404"
    }
  ],
};
