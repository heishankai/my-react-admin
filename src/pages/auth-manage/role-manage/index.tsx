import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { Button, FormInstance } from 'antd';
import { useRef } from 'react';

// components
import OperateModal from './components/OperateModal';

const RoleManage = () => {
  const actionRef = useRef<ActionType>();
  const tableFormRef = useRef<FormInstance<any>>();
  const operateModalRef = useRef<any>(null);

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
        ]}
      />
      <OperateModal ref={operateModalRef} actionRef={actionRef} />
    </>
  );
};

export default RoleManage;
