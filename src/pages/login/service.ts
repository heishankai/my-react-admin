import request from '@/utils/request';
import type { LoginParamsType } from './type';

/**
 * 登录请求
 */
export const loginService = async (data: LoginParamsType) => {
  return await request.post('/api/login', data);
};
