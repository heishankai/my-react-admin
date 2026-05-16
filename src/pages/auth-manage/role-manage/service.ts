import type { ApiResponse } from '@/types';
import request from '@/utils/request';
import type {
  AddRoleParamsType,
  RoleListParamsType,
  UpdateRoleParamsType,
} from './type';

/**
 * 新增角色
 */
export const addRoleService = async (data: AddRoleParamsType) => {
  return await request.post<ApiResponse<void>, ApiResponse<void>>(
    '/admin/role/create',
    data,
  );
};

/**
 * 更新角色
 */
export const updateRoleService = async (data: UpdateRoleParamsType) => {
  return await request.post<ApiResponse<void>, ApiResponse<void>>(
    '/admin/role/update',
    data,
  );
};

/**
 * 分页查询
 */
export const getRoleListService = async (data: RoleListParamsType) => {
  return await request.get<ApiResponse<void>, ApiResponse<void>>(
    '/admin/role/list',
    { params: data },
  );
};

/**
 * 删除角色
 */
export const deleteRoleService = async (data: { id: number }) => {
  return await request.post<ApiResponse<void>, ApiResponse<void>>(
    '/admin/role/delete',
    data,
  );
};
