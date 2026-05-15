// 运行时配置
import '@/styles/index.css';
import { history } from '@umijs/max';
import Cookies from 'js-cookie';
import { getAuthInfoService } from './pages/login/service';
import type { AuthInfoResponseData, CurrentUserInfo } from './pages/login/type';

export type InitialState = {
  currentUser?: CurrentUserInfo;
  roles: string[];
  menus: AuthInfoResponseData['menus'];
  permissions: string[];
};

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<InitialState> {
  const initialState: InitialState = {
    roles: [],
    menus: [],
    permissions: [],
  };

  if (history.location.pathname === '/login' || !Cookies.get('access_token')) {
    return initialState;
  }

  try {
    const { data } = await getAuthInfoService();
    return {
      currentUser: data?.userInfo,
      roles: data?.roles ?? [],
      menus: data?.menus ?? [],
      permissions: data?.permissions ?? [],
    };
  } catch {
    Cookies.remove('access_token');
    return initialState;
  }
}
