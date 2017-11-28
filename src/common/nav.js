import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: '系统管理',
        path: 'sys',
        children: [
          {
            name: '用户管理',
            path: 'users',
            component: dynamicWrapper(app, ['users'], () => import('../routes/Sys/Users')),
          },
          {
            name: '角色管理',
            path: 'role',
            component: dynamicWrapper(app, ['role'], () => import('../routes/Sys/Role')),
          },
          {
            name: '资源管理',
            path: 'resource-list',
            component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
          },
        ],
      },
    ],
  },
];

