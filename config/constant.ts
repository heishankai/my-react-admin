/** 开发代理路径，与 axios baseURL 为空时请求前缀一致 */
export const PROXY_PATH = {
  BASE_URL: '/api',
};

/** 各环境 dev server 代理目标（build 生产包走 define 中的 API_BASE_URL） */
export const API_TARGET = {
  dev: 'http://127.0.0.1:9501',
  test: 'https://zjiangyun.cn',
  prod: 'https://zjiangyun.cn',
};

/** 生产环境 axios baseURL（接口路径本身以 /admin 开头，不含 /api） */
export const API_BASE_URL_PROD = 'https://zjiangyun.cn';

/** 本地 dev server 代理前缀，转发到后端时保留完整路径（含 /api） */
export const API_BASE_URL_DEV = '/api';
