import { backToLogin } from '@/utils';
import { notification } from 'antd';
import Axios from 'axios';
import Cookies from 'js-cookie';

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

// 添加响应拦截器
/**
 * @description :添加响应拦截器
 * 2xx 范围内的状态码都会触发该函数。
 * 对响应数据做点什么
 * 停止loading
 * 返回response.data
 */
Request.interceptors.response.use(
  function (response) {
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
      const { code, data } = error?.response ?? {};
      if (code === 401) {
        backToLogin();
      }
      notification.error({
        message: data?.msg || '请求失败，请联系技术支持',
        duration: 3,
      });
    }

    return Promise.reject(error);
  },
);

export default Request;
