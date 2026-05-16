import type { ApiResponse } from '@/types';
import request from '@/utils/request';

/**
 * @description 获取权限类型枚举
 */
export const getAuthEnumListService = async () => {
  return await request.get<ApiResponse<any[]>, ApiResponse<any[]>>(
    '/admin/menu/types',
  );
};

/**
 * 新增菜单 & 增加菜单
 */
export const addMenuService = async (data: any) => {
  return await request.post<ApiResponse<void>, ApiResponse<void>>(
    '/admin/menu/create',
    data,
  );
};

/**
 * 更新菜单
 */
export const updateMenuService = async (data: any) => {
  return await request.post<ApiResponse<void>, ApiResponse<void>>(
    '/admin/menu/update',
    data,
  );
};

/**
 * 删除菜单
 */
export const deleteMenuService = async (data: any) => {
  return await request.post<ApiResponse<void>, ApiResponse<void>>(
    `/admin/menu/delete`,
    data,
  );
};

/**
 * 获取菜单列表
 */
export const getMenuListService = async () => {
  return await request.get<ApiResponse<any[]>, ApiResponse<any[]>>(
    '/admin/menu/list',
  );
};
