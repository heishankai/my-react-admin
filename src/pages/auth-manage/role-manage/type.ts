/**
 * 新增角色请求参数
 */
export type AddRoleParamsType = {
  role_name: string;
  role_key: string;
  remark?: string;
  status?: number;
  sort?: number;
};

/**
 * 更新角色请求参数
 */
export interface UpdateRoleParamsType extends AddRoleParamsType {
  id: number;
}

/**
 * 分页查询
 */
export interface RoleListParamsType {
  role_name?: string;
}

/**
 * 角色列表项
 */
export interface RoleListItemType {
  id: number;
  role_name: string;
  role_key: string;
  remark: string | null;
  status: number | null;
  sort: number | null;
  create_time: string | null;
  update_time: string | null;
}
