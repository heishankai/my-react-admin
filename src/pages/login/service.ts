import type { ApiResponse } from '@/types';
import request from '@/utils/request';
import type {
  AuthInfoResponseData,
  LoginParamsType,
  LoginResponseType,
} from './type';

/**
 * 登录请求
 */
export const loginService = async (data: LoginParamsType) => {
  return await request.post<LoginResponseType, LoginResponseType>(
    '/admin/auth/login',
    data,
  );
};

/**
 * 获取当前登录用户信息和权限
 */
export const getAuthInfoService = async () => {
  return await request.get<
    ApiResponse<AuthInfoResponseData>,
    ApiResponse<AuthInfoResponseData>
  >('/admin/auth/info');
};

/**
 * 退出登录
 */
export const logoutService = async () => {
  return await request.get<ApiResponse<void>, ApiResponse<void>>(
    '/admin/auth/logout',
  );
};
