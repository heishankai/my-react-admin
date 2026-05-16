import { defineConfig } from '@umijs/max';

import {
  API_BASE_URL_DEV,
  API_BASE_URL_PROD,
  API_TARGET,
  PROXY_PATH,
} from './constant';
import { getProxyConfig } from './utils';

const isBuild = process.env.NODE_ENV === 'production';

export default defineConfig({
  proxy: getProxyConfig(PROXY_PATH.BASE_URL, API_TARGET.prod),
  define: {
    'process.env.API_BASE_URL': isBuild ? API_BASE_URL_PROD : API_BASE_URL_DEV,
    'process.env.ENV': 'prod',
  },
});
