import { Space, Tooltip, Typography } from 'antd';

const { Text } = Typography;

export type PersonInfoCellProps = {
  name?: string;
  cardNo?: string;
  mobile?: string;
};

/** 表格内「姓名 + 证件 + 手机」紧凑展示 */
export const PersonInfoCell = ({
  name,
  cardNo,
  mobile,
}: PersonInfoCellProps) => {
  const line = (label: string, value?: string) =>
    value ? (
      <div
        style={{
          display: 'flex',
          gap: 6,
          alignItems: 'baseline',
          maxWidth: '100%',
        }}
      >
        <Text type="secondary" style={{ fontSize: 12, flexShrink: 0 }}>
          {label}
        </Text>
        <Tooltip title={value}>
          <Text ellipsis style={{ fontSize: 12, flex: 1, minWidth: 0 }}>
            {value}
          </Text>
        </Tooltip>
      </div>
    ) : null;

  return (
    <Space direction="vertical" size={4} style={{ width: '100%' }}>
      <Tooltip title={name}>
        <Text strong ellipsis style={{ display: 'block', maxWidth: '100%' }}>
          {name?.trim() || '—'}
        </Text>
      </Tooltip>
      {line('证件', cardNo)}
      {line('手机', mobile)}
    </Space>
  );
};
