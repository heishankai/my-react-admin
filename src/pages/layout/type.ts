export interface AppMenuItem {
  name: string;
  path: string;
  children?: AppMenuItem[];
}

export type AppHeaderProps = {
  collapsed: boolean;
  onToggleCollapsed: () => void;
};

export type AppSiderProps = {
  collapsed: boolean;
  /** 不传则用默认侧栏菜单 */
  menus?: AppMenuItem[];
};
