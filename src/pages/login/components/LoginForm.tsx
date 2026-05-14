import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import type { FormInstance } from 'antd';
import { Button, Divider, Typography } from 'antd';
import { useRef } from 'react';

import type { LoginParamsType } from '../type';

const { Title } = Typography;

const LoginForm = () => {
  // 表单ref
  const formRef = useRef<FormInstance<LoginParamsType>>(null);

  // 登录
  const onFinish = async (values: LoginParamsType) => {
    console.log(values);
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

        <Button block htmlType="submit" size="large" type="primary">
          登录
        </Button>
      </ProForm>
    </div>
  );
};

export default LoginForm;
