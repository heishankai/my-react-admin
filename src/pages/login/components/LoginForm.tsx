import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Divider, Typography } from 'antd';
import Cookies from 'js-cookie';
import { useRef } from 'react';
// types
import type { FormInstance } from 'antd';
import type { LoginParamsType } from '../type';

// services
import { getAuthInfoService, loginService } from '../service';

const { Title } = Typography;

const LoginForm = () => {
  // 表单ref
  const formRef = useRef<FormInstance<LoginParamsType>>(null);
  const { setInitialState } = useModel('@@initialState');

  const { loading, run } = useRequest(loginService, {
    manual: true,
    onSuccess: async ({ data }) => {
      if (data?.access_token) {
        Cookies.set('access_token', data.access_token);
        const authInfo = await getAuthInfoService();
        await setInitialState((state) => ({
          ...state,
          currentUser: authInfo.data?.userInfo,
          roles: authInfo.data?.roles ?? [],
          menus: authInfo.data?.menus ?? [],
          permissions: authInfo.data?.permissions ?? [],
        }));
        history.push('/');
      }
    },
  });

  // 登录
  const onFinish = async (values: LoginParamsType) => {
    await run(values);
  };

  return (
    <div style={{ maxWidth: 360, padding: 32, width: '100%' }}>
      <Title level={2} style={{ margin: 0, textAlign: 'center' }}>
        欢迎回来
      </Title>
      <Divider plain style={{ color: '#9ca3af', margin: '20px 0 28px' }}>
        账号密码登录
      </Divider>

      <ProForm
        formRef={formRef}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        submitter={false}
      >
        <ProFormText
          name="username"
          placeholder="请输入用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
          fieldProps={{
            allowClear: true,
            prefix: <UserOutlined />,
            size: 'large',
          }}
        />
        <ProFormText.Password
          name="password"
          placeholder="请输入密码"
          rules={[{ required: true, message: '请输入密码' }]}
          fieldProps={{
            prefix: <LockOutlined />,
            size: 'large',
          }}
        />

        <Button
          block
          htmlType="submit"
          loading={loading}
          size="large"
          type="primary"
        >
          登录
        </Button>
      </ProForm>
    </div>
  );
};

export default LoginForm;
