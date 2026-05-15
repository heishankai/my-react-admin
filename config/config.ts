import { defineConfig } from '@umijs/max';

import { devProxy } from './dev';
import { routes } from './routes';

const API_BASE_URL_PROD = 'https://zjiangyun.cn/api';

/**
 * 开发环境使用「同源相对路径 + devServer 代理」转发到本地 Hyperf，
 * 避免浏览器跨域 / 直连 127.0.0.1 导致的 Axios Network Error。
 * 生产环境仍走完整域名。
 */
const API_BASE_URL =
  process.env.NODE_ENV === 'production' ? API_BASE_URL_PROD : '';

export default defineConfig({
  links: [{ rel: 'icon', href: '/favicon.ico' }],
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: false,
  routes,
  npmClient: 'pnpm',
  define: {
    'process.env.API_BASE_URL': API_BASE_URL,
  },
  proxy: devProxy,
});
