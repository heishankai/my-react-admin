import { defineConfig } from '@umijs/max';

import { API_BASE_URL_DEV, API_TARGET, PROXY_PATH } from './constant';
import { getProxyConfig } from './utils';

/**
 * 测试环境配置
 */
export default defineConfig({
  proxy: getProxyConfig(PROXY_PATH.BASE_URL, API_TARGET.test),
  define: {
    'process.env.API_BASE_URL': API_BASE_URL_DEV,
    'process.env.ENV': 'test',
  },
});
