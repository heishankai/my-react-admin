import type { ApiResponse } from '@/types';
import type { InternalAxiosRequestConfig } from 'axios';

/**
 * refresh_token 换取 access_token 的接口响应
 */
export type RefreshTokenResponse = ApiResponse<{
  access_token: string;
  expires_in: number;
}>;

/**
 * 带重试标记的请求配置，避免 401 后重复刷新 token
 */
export type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};
