import type { ApiResponse } from '@/types';
import request from '@/utils/request';
import type { LoginParamsType } from './type';

export type LoginResponseType = ApiResponse<{ access_token: string }>;

/**
 * 登录请求
 */
export const loginService = async (data: LoginParamsType) => {
  return await request.post<LoginResponseType, LoginResponseType>(
    '/api/admin/auth/login',
    data,
  );
};
