import { defineConfig } from '@umijs/max';

import { routes } from './routes';

export default defineConfig({
  favicons: ['/favicon.ico'], // 确保图标在 public 根目录下
  antd: {},
  model: {},
  request: {},
  layout: false,
  routes,
  npmClient: 'pnpm',
});
