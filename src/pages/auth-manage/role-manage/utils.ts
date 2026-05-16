import { addRoleService, updateRoleService } from './service';

/**
 * @description 接口类型枚举
 */
export const SUBMIT_SERVICE: any = {
  add: addRoleService,
  edit: updateRoleService,
};
