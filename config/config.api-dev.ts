import { defineConfig } from '@umijs/max';

import { API_BASE_URL_DEV, API_TARGET, PROXY_PATH } from './constant';
import { getProxyConfig } from './utils';

/**
 * 本地开发环境配置
 * 代理到本地9501端口
 * 定义API_BASE_URL为本地开发环境地址
 * 定义ENV为dev
 */
export default defineConfig({
  proxy: getProxyConfig(PROXY_PATH.BASE_URL, API_TARGET.dev),
  define: {
    'process.env.API_BASE_URL': API_BASE_URL_DEV,
    'process.env.ENV': 'dev',
  },
});
