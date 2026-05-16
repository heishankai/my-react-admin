export const routes = [
  {
    path: '/login',
    component: './login',
  },
  {
    path: '/',
    component: './layout',
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        name: '工作台',
        path: '/home',
        component: './home',
      },
      {
        name: '保单管理',
        path: '/policy-manage',
        component: './policy-manage',
      },
      {
        name: '权限管理',
        path: '/auth-manage',
        routes: [
          {
            name: '角色管理',
            path: '/auth-manage/role-manage',
            component: './auth-manage/role-manage',
          },
          {
            name: '菜单管理',
            path: '/auth-manage/menu-manage',
            component: './auth-manage/menu-manage',
          },
        ],
      },
      {
        path: '*',
        component: './404',
      },
    ],
  },
];
