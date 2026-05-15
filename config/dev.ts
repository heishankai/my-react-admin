/**
 * 仅开发服务器（max dev）生效：同源请求转发到本地 Hyperf。
 */
export const devProxy = {
  '/api': {
    target: 'http://127.0.0.1:9501',
    changeOrigin: true,
  },
};
