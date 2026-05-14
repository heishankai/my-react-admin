/**
 * 通用接口响应类型
 */
export interface ApiResponse<T = unknown> {
  code: number;
  data?: T;
  msg?: string;
  message?: string;
}
