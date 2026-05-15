import type { ApiResponse } from '@/types';
import { backToLogin, retryWithNewToken } from '@/utils';
import { notification } from 'antd';
import type { AxiosError } from 'axios';
import Axios from 'axios';
import Cookies from 'js-cookie';
import type { RetryRequestConfig } from './type';

// 创建一个 Axios 实例
const Request = Axios.create({
  baseURL: process.env.API_BASE_URL ?? '',
  timeout: 8000,
  headers: { 'content-type': 'application/json' },
  withCredentials: true,
});

// 请求拦截器
Request.interceptors.request.use(
  (config) => {
    const access_token = Cookies.get('access_token') || null;

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
Request.interceptors.response.use(
  async (response): Promise<any> => {
    const data = response?.data as ApiResponse;
    const originalRequest = response.config as RetryRequestConfig;

    if (data?.code === 401) {
      try {
        const retryResponse = await retryWithNewToken(Request, originalRequest);
        if (retryResponse) {
          return retryResponse;
        }
      } catch {
        backToLogin();
      }

      backToLogin();
      return Promise.reject(data);
    }

    if (typeof data?.code === 'number' && data.code !== 200) {
      notification.error({
        message: data.message || '请求失败，请联系技术支持',
        duration: 3,
      });

      return Promise.reject(data);
    }

    return data;
  },
  async (error: AxiosError<ApiResponse>) => {
    const originalRequest = error.config as RetryRequestConfig | undefined;

    if (error?.response?.status === 401) {
      try {
        const retryResponse = await retryWithNewToken(Request, originalRequest);
        if (retryResponse) {
          return retryResponse;
        }
      } catch {
        backToLogin();
      }

      backToLogin();
    }

    notification.error({
      message: error?.response?.data?.message || '请求失败，请联系技术支持',
      duration: 3,
    });

    return Promise.reject(error);
  },
);

export default Request;
