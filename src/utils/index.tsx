import * as AntdIcons from '@ant-design/icons';
import { history } from '@umijs/max';
import type { AxiosInstance } from 'axios';
import Axios from 'axios';
import Cookies from 'js-cookie';
import type { RefreshTokenResponse, RetryRequestConfig } from './type';

const refreshRequest = Axios.create({
  baseURL: process.env.API_BASE_URL ?? '',
  timeout: 8000,
  headers: { 'content-type': 'application/json' },
  withCredentials: true,
});

let refreshingToken: Promise<string> | null = null;

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
 * 判断当前请求是否为认证接口，认证接口不参与刷新重试
 */
export const isAuthRequest = (url = '') => {
  return (
    url.includes('/api/admin/auth/login') ||
    url.includes('/api/admin/auth/refresh')
  );
};

/**
 * 使用 HttpOnly Cookie 中的 refresh_token 换取新的 access_token
 */
export const refreshAccessToken = async () => {
  if (!refreshingToken) {
    refreshingToken = refreshRequest
      .post<RefreshTokenResponse>('/api/admin/auth/refresh')
      .then(({ data: response }) => {
        const accessToken = response.data?.access_token;
        if (!accessToken) {
          return Promise.reject(new Error('refresh_token 已失效'));
        }
        Cookies.set('access_token', accessToken);
        return accessToken;
      })
      .finally(() => {
        refreshingToken = null;
      });
  }

  return refreshingToken;
};

/**
 * 刷新 token 后重试原请求
 */
export const retryWithNewToken = async (
  request: AxiosInstance,
  config?: RetryRequestConfig,
) => {
  if (!config || config._retry || isAuthRequest(config.url)) {
    return null;
  }

  config._retry = true;
  const accessToken = await refreshAccessToken();
  config.headers.Authorization = `Bearer ${accessToken}`;
  return request(config);
};

/**
 * 清理登录态并返回登录页
 */
export const backToLogin = () => {
  clearLoginState();
  redirectToLogin();
};
