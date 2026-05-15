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
        name: '菜单管理',
        path: '/menu-manage',
        component: './menu-manage',
      },
    ],
  },
];
