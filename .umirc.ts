import { defineConfig } from '@umijs/max';

const API_BASE_URL_PROD = 'https://zjiangyun.cn/api';

/**
 * 开发环境使用「同源相对路径 + devServer 代理」转发到 Spring Boot，
 * 避免浏览器跨域 / 直连 127.0.0.1 导致的 Axios Network Error。
 * 生产环境仍走完整域名。
 */
const API_BASE_URL =
  process.env.NODE_ENV === 'production' ? API_BASE_URL_PROD : '';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/login',
      component: './login',
      layout: false,
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './home',
    },
  ],
  npmClient: 'pnpm',
  define: {
    'process.env.API_BASE_URL': API_BASE_URL,
  },
  /**
   * 仅开发服务器生效：同源请求转发到 Spring Boot（默认 8080）
   * - /role/* 角色接口
   * - /api/*  与原先直连 8080 时的登录等接口路径保持一致
   */
  proxy: {
    '/role': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    },
    '/api': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    },
  },
});
