import { getProTableConfig } from '@/utils/pro-table-config';
import { ActionType, ProTable } from '@ant-design/pro-components';
import type { FormInstance } from 'antd';
import { useRef } from 'react';
import { PersonInfoCell } from './components/PersonInfoCell';
// services
import { getPolicyListService } from './service';
import type { PolicyItemType } from './type';

const PolicyManage = () => {
  const actionRef = useRef<ActionType>();
  const tableFormRef = useRef<FormInstance<any>>();

  return (
    <ProTable<any, any>
      actionRef={actionRef}
      formRef={tableFormRef}
      {...getProTableConfig({
        request: async (params) => {
          return await getPolicyListService(params);
        },
      })}
      scroll={{ x: 900 }}
      rowKey="orders_id"
      columns={[
        {
          title: '保单号',
          dataIndex: 'policy_no',
          hideInTable: true,
          valueType: 'text',
        },
        {
          title: '产品名称',
          dataIndex: 'alias_name',
          hideInTable: true,
          valueType: 'text',
        },
        {
          title: '投保人',
          dataIndex: 'apply_user_info',
          hideInTable: true,
          valueType: 'text',
        },
        {
          title: '被保人',
          dataIndex: 'insured_user_info',
          hideInTable: true,
          valueType: 'text',
        },
        {
          title: '状态',
          dataIndex: 'orders_status',
          hideInTable: true,
          valueType: 'select',
          fieldProps: {
            options: [
              { label: '生效中', value: 2 },
              { label: '已失效', value: 3 },
              { label: '已退保', value: 4 },
            ],
          },
        },
        // show
        {
          title: '保单号',
          dataIndex: 'policy_no',
          hideInSearch: true,
          width: 180,
          ellipsis: true,
          fixed: 'left',
        },
        {
          title: '产品名称',
          dataIndex: 'alias_name',
          hideInSearch: true,
          width: 180,
          ellipsis: true,
        },
        {
          title: '投保人信息',
          dataIndex: 'apply_name',
          hideInSearch: true,
          width: 200,
          render: (_: unknown, record: PolicyItemType) => (
            <PersonInfoCell
              name={record?.apply_name}
              cardNo={record?.apply_card_no}
              mobile={record?.apply_mobile}
            />
          ),
        },
        {
          title: '被保人信息',
          dataIndex: 'insured_name',
          hideInSearch: true,
          width: 200,
          render: (_: unknown, record: PolicyItemType) => (
            <PersonInfoCell
              name={record?.insured_name}
              cardNo={record?.insured_card_no}
              mobile={record?.insured_mobile}
            />
          ),
        },
        {
          title: '保单起止时间',
          dataIndex: 'start_date',
          hideInSearch: true,
          width: 350,
          ellipsis: true,
          render: (text: any, record: any) => {
            return <span>{`${record.start_date} ~ ${record.end_date}`}</span>;
          },
        },
        {
          title: '保单金额',
          valueType: 'money',
          dataIndex: 'total_premium',
          hideInSearch: true,
          width: 140,
          ellipsis: true,
        },
        {
          title: '医院名称',
          dataIndex: 'org_name',
          hideInSearch: true,
          width: 180,
          ellipsis: true,
        },
        {
          title: '健管机构',
          dataIndex: 'reg_name',
          hideInSearch: true,
          width: 180,
          ellipsis: true,
        },
        {
          title: '保险公司',
          dataIndex: 'company_name',
          hideInSearch: true,
          width: 250,
          ellipsis: true,
        },
        {
          title: '创建时间',
          dataIndex: 'created_at',
          hideInSearch: true,
          width: 180,
          ellipsis: true,
        },
        {
          title: '更新时间',
          dataIndex: 'updated_at',
          hideInSearch: true,
          width: 180,
          ellipsis: true,
        },
        {
          title: '状态',
          dataIndex: 'orders_status',
          hideInSearch: true,
          width: 110,
          ellipsis: true,
          fixed: 'right',
          valueEnum: {
            2: {
              text: '生效中',
              status: 'Success',
            },
            3: {
              text: '已失效',
              status: 'Error',
            },
            4: {
              text: '已退保',
              status: 'Default',
            },
          },
        },
      ]}
    />
  );
};

export default PolicyManage;
