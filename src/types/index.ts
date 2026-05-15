/**
 * @description 通用接口响应类型
 */
export interface ApiResponse<T = unknown> {
  code: number;
  data?: T;
  msg?: string;
  message?: string;
}

/**
 * @description 通用分页返回
 */
export interface PageDataType<T = unknown> {
  paginate: {
    total: number;
    page: number;
    page_size: number;
    page_total: number;
  };
  list: T[];
}

/**
 * @description 通用弹框标题标识
 */
export type ModuleType = 'add' | 'edit' | 'detail' | 'increase';
