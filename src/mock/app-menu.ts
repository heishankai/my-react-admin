import type { AppMenuItem } from '@/pages/layout/type';

/** 侧栏菜单 mock，与 config/routes 对齐，后续可再接后端动态菜单 */
export const MOCK_APP_MENU: AppMenuItem[] = [
  {
    name: '工作台',
    path: '/home',
  },
  {
    name: '保单管理',
    path: '/policy-manage',
  },
  {
    name: '权限管理',
    path: '/auth-manage',
    children: [
      {
        name: '角色管理',
        path: '/auth-manage/role-manage',
      },
      {
        name: '菜单管理',
        path: '/auth-manage/menu-manage',
      },
    ],
  },
];
