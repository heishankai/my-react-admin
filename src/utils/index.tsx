import * as AntdIcons from '@ant-design/icons';

/**
 * @description 渲染菜单图标
 * @param icon 图标名称
 * @returns 图标组件
 */
export const renderMenuIcon = (icon?: string) => {
  if (!icon) return null;

  const Icon = (AntdIcons as Record<string, any>)[icon];

  return Icon ? <Icon /> : null;
};
