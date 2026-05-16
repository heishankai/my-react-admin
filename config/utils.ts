/** pathRewrite 默认不重写，保留 /api 等与后端路由一致 */
export const getProxyConfig = (
  path: string,
  target: string,
  pathRewrite: Record<string, string> = {},
) => ({
  [path]: {
    target,
    changeOrigin: true,
    pathRewrite,
  },
});
