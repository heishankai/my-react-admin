import { Outlet, useModel, useNavigate } from '@umijs/max';
import { Layout, Spin } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import AppSider from './components/AppSider';
import AppHeader from './components/Header';

const { Content, Header } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { initialState, loading } = useModel('@@initialState');
  const hasAccessToken = !!Cookies.get('access_token');

  useEffect(() => {
    if (!loading && (!hasAccessToken || !initialState?.currentUser)) {
      navigate('/login');
    }
  }, [hasAccessToken, initialState?.currentUser, loading, navigate]);

  if (loading || (hasAccessToken && !initialState?.currentUser)) {
    return (
      <div className="app-page-loading">
        <Spin />
      </div>
    );
  }

  if (!hasAccessToken || !initialState?.currentUser) {
    return null;
  }

  return (
    <Layout className="app-layout">
      <AppSider collapsed={collapsed} />

      <Layout>
        <Header className="app-layout-header">
          <AppHeader
            collapsed={collapsed}
            onToggleCollapsed={() => setCollapsed((value) => !value)}
          />
        </Header>

        <Content className="app-layout-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
