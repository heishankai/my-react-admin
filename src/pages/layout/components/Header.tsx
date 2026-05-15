import { logoutService } from '@/pages/login/service';
import { history, useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Avatar, Button, Dropdown, Space } from 'antd';
import Cookies from 'js-cookie';
import styled from 'styled-components';

// icons
import {
  DownOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';

// types
import type { MenuProps } from 'antd';
import type { AppHeaderProps } from '../type';

const HeaderWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AppHeader = ({ collapsed, onToggleCollapsed }: AppHeaderProps) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;

  // 退出登录
  const { loading: logoutLoading, run: handleLogout } = useRequest(
    logoutService,
    {
      manual: true,
      onFinally: async () => {
        await setInitialState((state) => ({
          ...state,
          currentUser: undefined,
          roles: [],
          menus: [],
          permissions: [],
        }));
        Cookies.remove('access_token');
        history.push('/login');
      },
    },
  );

  const handleLogoutClick = () => {
    if (logoutLoading) return;
    handleLogout();
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <div>个人主页</div>,
      icon: <UserOutlined />,
    },
    {
      key: '2',
      danger: true,
      disabled: logoutLoading,
      label: <div onClick={handleLogoutClick}>退出登录</div>,
      icon: <LoginOutlined />,
    },
  ];

  return (
    <HeaderWrapper>
      <div>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggleCollapsed}
        />
      </div>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar
              size="small"
              src={currentUser?.avatar || undefined}
              icon={<UserOutlined />}
            />
            <span>
              {currentUser?.nickname || currentUser?.username || '未登录'}
            </span>
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </HeaderWrapper>
  );
};

export default AppHeader;
