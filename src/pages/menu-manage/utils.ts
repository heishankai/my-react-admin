import type { ModuleType } from '@/types';
import { addMenuService, updateMenuService } from './service';

/**
 * @description 弹窗类型枚举
 */
export const MODULE_TYPE_MAP: Record<ModuleType, string> = {
  add: '新增',
  edit: '修改',
  detail: '详情',
  increase: '增加',
};

/**
 * @description 接口类型枚举
 */
export const SUBMIT_SERVICE: any = {
  add: addMenuService,
  edit: updateMenuService,
  increase: addMenuService,
};

export const AUTH_ENUM_TAG_TYPE_MAP: any = {
  menu: { label: '菜单', tagType: 'processing' },
  page: { label: '页面', tagType: 'success' },
  button: { label: '按钮', tagType: 'warning' },
};
