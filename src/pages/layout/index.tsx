import { Outlet, useNavigate } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Layout, Spin } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { getAuthInfoService } from '@/pages/login/service';

import AppSider from './components/AppSider';
import AppHeader from './components/Header';
import { DEFAULT_APP_MENU } from './constants';

const { Content, Header } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const hasToken = !!Cookies.get('access_token');

  const {
    data: authRes,
    loading,
    error,
  } = useRequest(getAuthInfoService, {
    ready: hasToken,
    refreshDeps: [hasToken],
  });

  useEffect(() => {
    if (!hasToken) {
      navigate('/login', { replace: true });
    }
  }, [hasToken, navigate]);

  useEffect(() => {
    if (error) {
      Cookies.remove('access_token');
      navigate('/login', { replace: true });
    }
  }, [error, navigate]);

  useEffect(() => {
    if (!loading && !error && authRes && !authRes.data?.userInfo) {
      Cookies.remove('access_token');
      navigate('/login', { replace: true });
    }
  }, [authRes, error, loading, navigate]);

  if (!hasToken) {
    return null;
  }

  if (loading || !authRes?.data?.userInfo) {
    return (
      <div className="app-page-loading">
        <Spin />
      </div>
    );
  }

  const { userInfo } = authRes.data;

  return (
    <Layout className="app-layout">
      <AppSider collapsed={collapsed} menus={DEFAULT_APP_MENU} />

      <Layout>
        <Header className="app-layout-header">
          <AppHeader
            collapsed={collapsed}
            currentUser={userInfo}
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
