import * as AntdIcons from '@ant-design/icons';
import { history } from '@umijs/max';
import Cookies from 'js-cookie';

/**
 * @description 渲染菜单图标
 * @param icon 图标名称
 * @returns 图标组件
 */
export const renderMenuIcon = (icon?: string) => {
  if (!icon) return null;

  const Icon = (AntdIcons as Record<string, any>)[icon];

  return Icon ? <Icon /> : null;
};

/**
 * 清理本地登录态
 */
export const clearLoginState = () => {
  Cookies.remove('access_token');
};

/**
 * 跳转登录页，避免在登录页重复跳转
 */
export const redirectToLogin = () => {
  if (history.location.pathname !== '/login') {
    history.push('/login');
  }
};

/**
 * 清理登录态并返回登录页
 */
export const backToLogin = () => {
  clearLoginState();
  redirectToLogin();
};
