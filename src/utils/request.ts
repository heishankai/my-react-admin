import { history } from '@umijs/max';
import axios from 'axios';
import { saveAs } from 'file-saver';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { notification } from 'antd';

export const BASE_URL = process.env.API_BASE_URL;

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 读取浏览器 Cookie
 * @param name Cookie 名称
 * @returns Cookie 值
 */
const getCookie = (name: string) => {
  if (typeof document === 'undefined') {
    return '';
  }

  const match = document.cookie
    .split('; ')
    .find((item) => item.startsWith(`${encodeURIComponent(name)}=`));

  return match ? decodeURIComponent(match.split('=').slice(1).join('=')) : '';
};

/**
 * 删除浏览器 Cookie
 * @param name Cookie 名称
 */
const removeCookie = (name: string) => {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${encodeURIComponent(
    name,
  )}=; Max-Age=0; path=/; SameSite=Lax`;
};

/**
 * 清理本地登录状态
 */
const clearLoginState = () => {
  removeCookie('admin-token');

  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('userInfo');
  }
};

/**
 * @description :添加请求拦截器
 * 在发送请求之前做些什么
 * 启动loading
 * 设置token
 * 设置请求头
 * 返回config
 */
request.interceptors.request.use(
  function (config) {
    NProgress.start();

    const token = getCookie('admin-token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // FormData 请求不需要设置 Content-Type，让浏览器自动设置（包含 boundary）
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  function (error) {
    /**
     * 对请求错误做些什么
     * 停止loading
     * 返回error
     */
    NProgress.done();
    return Promise.reject(error);
  },
);

// 添加响应拦截器
/**
 * @description :添加响应拦截器
 * 2xx 范围内的状态码都会触发该函数。
 * 对响应数据做点什么
 * 停止loading
 * 返回response.data
 */
request.interceptors.response.use(
  function (response) {
    /**
     * 2xx 范围内的状态码都会触发该函数。
     * 对响应数据做点什么
     * 停止loading
     * 返回response.data
     */
    NProgress.done();
    // 如果是 blob 响应，直接返回 response，由调用方处理
    if (response.config.responseType === 'blob') {
      return response;
    }
    return response.data;
  },
  function (error) {
    /**
     * 超出 2xx 范围的状态码都会触发该函数。
     * 对响应错误做点什么
     * 401 - 清除登录数据
     * 返回error
     */
    console.log(error, 'error');

    if (error.response) {
      const { status, data } = error?.response ?? {};

      if (status === 401) {
        clearLoginState();
        history.push('/login');
        return;
      }
      notification.error({
        message: '提示信息',
        description: data?.message,
      });
    } else if (error?.message === 'Network Error') {
      notification.error({
        message: '网络异常',
        description:
          '无法连接后端服务。请确认 fitment-java 已启动（默认 http://127.0.0.1:8080）、数据库与 Redis 可用；开发环境需使用 pnpm dev 以启用接口代理。',
      });
    }

    NProgress.done();
    return Promise.reject(error);
  },
);

/**
 * 导出文件（Excel等）
 * @param url 请求地址
 * @param data 请求参数
 * @param filename 文件名
 * @returns Promise<void>
 */
export const exportFile = async (
  url: string,
  data?: any,
  filename = '导出文件.xlsx',
): Promise<void> => {
  try {
    const response = await request.post(url, data || {}, {
      responseType: 'blob',
    });

    saveAs(new Blob([response.data]), filename);
  } catch (error: any) {
    console.error('导出失败:', error);
    throw new Error(error?.response?.data?.message || '导出失败');
  }
};

export default request;
