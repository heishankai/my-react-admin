import {
  DeleteOutlined,
  FormOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { ActionType, ProTable } from '@ant-design/pro-components';
import {
  Button,
  Divider,
  FormInstance,
  Popconfirm,
  Space,
  message,
} from 'antd';
import { useRef } from 'react';

// services
import { deleteRoleService } from './service';
// components
import ConfigAuthModal from './components/ConfigAuthModal';
import OperateModal from './components/OperateModal';

const RoleManage = () => {
  const actionRef = useRef<ActionType>();
  const tableFormRef = useRef<FormInstance<any>>();
  const operateModalRef = useRef<any>(null);
  const configAuthModalRef = useRef<any>(null);

  // 删除角色
  const handleDelete = async (id: any) => {
    const { code } = (await deleteRoleService({ id })) as any;
    if (code !== 200) return;
    message.success('删除成功');
    actionRef.current?.reload();
  };

  return (
    <>
      <ProTable
        actionRef={actionRef}
        formRef={tableFormRef}
        scroll={{ x: 900 }}
        rowKey="id"
        headerTitle={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              operateModalRef.current?.handleOpenModal('add');
            }}
          >
            新增
          </Button>
        }
        dataSource={[
          {
            id: 1,
            role_name: '管理员',
            remark: '管理员',
            create_time: '2026-01-01',
            update_time: '2026-01-01',
            status: 1,
          },
        ]}
        columns={[
          // search
          {
            title: '角色名称',
            dataIndex: 'role_name',
            hideInTable: true,
            width: 180,
            ellipsis: true,
          },
          // show
          {
            title: '角色名称',
            dataIndex: 'role_name',
            hideInSearch: true,
            width: 180,
            ellipsis: true,
          },
          {
            title: '角色备注',
            dataIndex: 'remark',
            hideInSearch: true,
            width: 180,
            ellipsis: true,
          },
          {
            title: '创建时间',
            dataIndex: 'create_time',
            hideInSearch: true,
            width: 180,
            ellipsis: true,
          },
          {
            title: '更新时间',
            dataIndex: 'update_time',
            hideInSearch: true,
            width: 180,
            ellipsis: true,
          },
          {
            title: '状态',
            dataIndex: 'status',
            hideInSearch: true,
            width: 180,
            valueEnum: {
              1: {
                text: '启用',
                status: 'Success',
              },
              0: {
                text: '禁用',
                status: 'Error',
              },
            },
          },
          {
            title: '操作',
            width: 290,
            valueType: 'option',
            fixed: 'right',
            render: (_, record: any) => {
              return (
                <Space split={<Divider type="vertical" />}>
                  <Button
                    type="link"
                    icon={<SettingOutlined />}
                    style={{ padding: 0 }}
                    onClick={() => {
                      configAuthModalRef.current?.handleOpenModal(record);
                    }}
                  >
                    配置权限
                  </Button>
                  <Button
                    type="link"
                    icon={<FormOutlined />}
                    style={{ padding: 0 }}
                    onClick={() => {
                      operateModalRef.current?.handleOpenModal('edit', record);
                    }}
                  >
                    修改
                  </Button>
                  <Popconfirm
                    title="确认删除吗？"
                    onConfirm={() => handleDelete(record.id)}
                    style={{ padding: 0 }}
                  >
                    <Button type="link" icon={<DeleteOutlined />}>
                      删除
                    </Button>
                  </Popconfirm>
                </Space>
              );
            },
          },
        ]}
      />
      <ConfigAuthModal ref={configAuthModalRef} actionRef={actionRef} />
      <OperateModal ref={operateModalRef} actionRef={actionRef} />
    </>
  );
};

export default RoleManage;
