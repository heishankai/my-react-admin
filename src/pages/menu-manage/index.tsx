import {
  CaretDownOutlined,
  CaretRightOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type { ActionType, FormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Divider, Popconfirm, Space, Switch, Tag, message } from 'antd';
import { useRef } from 'react';

// utils
import { renderMenuIcon } from '@/utils';
import { AUTH_ENUM_TAG_TYPE_MAP } from './utils';

// services
import {
  deleteMenuService,
  getMenuListService,
  updateMenuService,
} from './service';

// components
import OperateModal from './components/OperateModal';

const MenuManage = () => {
  const actionRef = useRef<ActionType>();
  const tableFormRef = useRef<FormInstance<any>>();
  const operateModalRef = useRef<any>(null);

  // 删除菜单
  const handleDelete = async (id: any) => {
    const { code } = (await deleteMenuService({ id })) as any;
    if (code !== 200) return;
    message.success('删除成功');
    actionRef.current?.reload();
  };

  // 开启/关闭菜单
  const handleToggleVisible = async (data: any) => {
    const { code } = (await updateMenuService(data)) as any;
    if (code !== 200) return;
    message.success(data?.visible ? '开启成功' : '关闭成功');
    actionRef.current?.reload();
  };

  return (
    <>
      <ProTable
        actionRef={actionRef}
        formRef={tableFormRef}
        request={async () => {
          const res: any = await getMenuListService();

          return {
            data: res?.data ?? [],
            success: res?.code === 200,
          };
        }}
        pagination={false}
        scroll={{ x: 900 }}
        search={false}
        rowKey="id"
        expandable={{
          expandIcon: ({ expanded, onExpand, record }) => {
            if (!record?.children?.length) return null;

            const Icon = expanded ? CaretDownOutlined : CaretRightOutlined;

            return (
              <Icon
                style={{ cursor: 'pointer', fontSize: 16, marginRight: 8 }}
                onClick={(event) => onExpand(record, event)}
              />
            );
          },
        }}
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
          {
            title: '权限名称',
            dataIndex: 'name',
            hideInSearch: true,
            width: '70%',
            render: (_, record: any) => {
              const { label, tagType } = AUTH_ENUM_TAG_TYPE_MAP[record?.type];

              return (
                <Space size={4}>
                  <Tag color={tagType}>{label}</Tag>
                  {renderMenuIcon(record?.icon)}
                  <div style={{ marginLeft: 4 }}>{record?.name}</div>
                </Space>
              );
            },
          },
          {
            title: '操作',
            width: '30%',
            valueType: 'option',
            fixed: 'right',
            render: (_, record: any) => {
              return (
                <Space split={<Divider type="vertical" />}>
                  <Popconfirm
                    title={
                      record?.visible ? '确认要关闭吗？' : '确认要开启吗？'
                    }
                    onConfirm={() =>
                      handleToggleVisible({
                        ...record,
                        visible: !record?.visible,
                      })
                    }
                  >
                    <Switch size="small" checked={record?.visible} />
                  </Popconfirm>
                  <Button
                    type="link"
                    icon={<PlusCircleOutlined />}
                    style={{ padding: 0 }}
                    onClick={() => {
                      operateModalRef.current?.handleOpenModal(
                        'increase',
                        record,
                      );
                    }}
                  >
                    增加
                  </Button>
                  <Button
                    type="link"
                    icon={<EditOutlined />}
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
                  >
                    <Button
                      type="link"
                      icon={<DeleteOutlined />}
                      style={{ padding: 0 }}
                      onClick={() => {}}
                    >
                      删除
                    </Button>
                  </Popconfirm>
                </Space>
              );
            },
          },
        ]}
      />
      <OperateModal ref={operateModalRef} actionRef={actionRef} />
    </>
  );
};

export default MenuManage;
