import { Col, Row, Space, Typography } from 'antd';
import type { CSSProperties } from 'react';
import LoginForm from './components/LoginForm';

const { Paragraph, Text, Title } = Typography;

const brandPanelStyle: CSSProperties = {
  alignItems: 'center',
  background:
    'linear-gradient(135deg, rgba(22, 78, 99, 0.94), rgba(37, 99, 235, 0.88)), #164e63',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  minHeight: '100vh',
  overflow: 'hidden',
  padding: 48,
  position: 'relative',
};

const shapeStyle: CSSProperties = {
  border: '1px solid rgba(255, 255, 255, 0.22)',
  height: 280,
  left: '12%',
  position: 'absolute',
  top: '15%',
  transform: 'rotate(24deg)',
  width: 280,
};

const Login = () => {
  return (
    <Row style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Col lg={16} md={12} xs={0} style={brandPanelStyle}>
        <div style={shapeStyle} />
        <div
          style={{
            ...shapeStyle,
            bottom: '16%',
            height: 190,
            left: 'auto',
            right: '14%',
            top: 'auto',
            width: 190,
          }}
        />
        <Space
          direction="vertical"
          size={18}
          style={{ maxWidth: 520, position: 'relative', zIndex: 1 }}
        >
          <Text strong style={{ color: 'rgba(255,255,255,0.76)' }}>
            MY ADMIN
          </Text>
          <Title
            style={{ color: '#fff', fontSize: 56, lineHeight: 1.12, margin: 0 }}
          >
            商保管理平台
          </Title>
          <Paragraph
            style={{ color: 'rgba(255,255,255,0.78)', fontSize: 18, margin: 0 }}
          >
            聚焦商保管理流程，快速进入工作台。
          </Paragraph>
        </Space>
      </Col>
      <Col
        lg={8}
        md={12}
        xs={24}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LoginForm />
      </Col>
    </Row>
  );
};

export default Login;
