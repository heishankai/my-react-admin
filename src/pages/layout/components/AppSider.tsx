import { useLocation, useNavigate } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useMemo } from 'react';

import styled from 'styled-components';
import { DEFAULT_APP_MENU } from '../constants';
import type { AppMenuItem, AppSiderProps } from '../type';

const { Sider } = Layout;

const toMenuItems = (menus: AppMenuItem[]): MenuProps['items'] =>
  menus.map((menu) => ({
    key: menu.path,
    label: menu.name,
    children: menu.children?.length ? toMenuItems(menu.children) : undefined,
  }));

const findSelectedMenuKey = (
  menus: AppMenuItem[],
  pathname: string,
): string | undefined => {
  for (const menu of menus) {
    if (pathname === menu.path || pathname.startsWith(`${menu.path}/`)) {
      return menu.path;
    }
    const selectedChildKey = menu.children?.length
      ? findSelectedMenuKey(menu.children, pathname)
      : undefined;
    if (selectedChildKey) {
      return selectedChildKey;
    }
  }
};

const LogoWrapper = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  height: 56px;
  padding: ${(p) => (p.$collapsed ? '0 8px' : '0 16px')};
  justify-content: center;
  text-align: center;
  color: #1f2937;
  font-weight: 600;

  img {
    display: block;
    width: 28px;
    height: 28px;
    object-fit: contain;
  }
`;

const AppSider = ({ collapsed, menus = DEFAULT_APP_MENU }: AppSiderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = useMemo(() => toMenuItems(menus), [menus]);

  const selectedKeys = useMemo(
    () => [findSelectedMenuKey(menus, location.pathname) || '/home'],
    [location.pathname, menus],
  );

  return (
    <Sider collapsible collapsed={collapsed} trigger={null} width={220}>
      <LogoWrapper $collapsed={collapsed}>
        {collapsed ? <img src="/favicon.ico" alt="logo" /> : '商保管理后台'}
      </LogoWrapper>
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        items={menuItems}
        onClick={({ key }) => navigate(String(key))}
      />
    </Sider>
  );
};

export default AppSider;
