import {
  ModalForm,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { useBoolean, useRequest } from 'ahooks';
import { Form, message } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

// services
import { getAuthEnumListService } from '../service';

// types
import type { ModuleType } from '@/types';
import type { ForwardRefRenderFunction } from 'react';

// utils
import { MODULE_TYPE_MAP, SUBMIT_SERVICE } from '../utils';

const OperateModal: ForwardRefRenderFunction<{ actionRef: any }, any> = (
  { actionRef },
  ref,
) => {
  const [form] = Form.useForm();
  const [visble, { setTrue, setFalse }] = useBoolean(false);
  const [modalTitle, setModalTitle] = useState<ModuleType>('add');
  const [record, setRecord] = useState<any>(null);

  const type = Form.useWatch('type', form);

  // 获取权限类型枚举
  const { run: getAuthEnumListRun, data: authEnumListData } = useRequest(
    getAuthEnumListService,
    { manual: true },
  );

  // 打开弹框
  const handleOpenModal = (type: ModuleType, row?: any) => {
    setModalTitle(type);
    setTrue();
    getAuthEnumListRun();
    setRecord(row);

    if (type === 'edit') {
      form.setFieldsValue({ ...row });
    }
  };

  // 表单提交
  const handleFinish = async (values: any) => {
    // increase 需要增加父级id，增加菜单需要增加父级id
    if (modalTitle === 'increase') {
      record.parent_id = record?.id;
    }

    const { code } = await SUBMIT_SERVICE[modalTitle]({
      ...record,
      ...values,
    });

    if (code !== 200) return;

    message.success(`${MODULE_TYPE_MAP[modalTitle]}成功`);
    actionRef.current?.reload();
    setFalse();
  };

  // 暴露子组件方法 和数据
  useImperativeHandle(ref as any, () => {
    return {
      handleOpenModal,
    };
  });

  return (
    <ModalForm
      title={`${MODULE_TYPE_MAP[modalTitle]}`}
      open={visble}
      form={form}
      width="40%"
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      modalProps={{ onCancel: setFalse, destroyOnClose: true }}
      onFinish={handleFinish}
      initialValues={{
        type: 'menu',
        sort: 0,
      }}
    >
      <ProFormText name="name" label="权限名称" rules={[{ required: true }]} />

      <ProFormRadio.Group
        name="type"
        label="权限类型"
        rules={[{ required: true, message: '请选择权限类型' }]}
        fieldProps={{
          options: (authEnumListData?.data || [])?.map((item: any) => ({
            label: item?.name,
            value: item?.code,
          })),
        }}
      />

      {type === 'page' && (
        <ProFormText
          label="页面路径"
          name="path"
          rules={[{ required: true }]}
        />
      )}

      {type === 'button' && (
        <ProFormText
          label="按钮id"
          name="permission"
          rules={[{ required: true }]}
        />
      )}

      <ProFormText
        label="图标"
        name="icon"
        tooltip="https://5x-ant-design.antgroup.com/components/icon-cn"
        fieldProps={{
          placeholder: '请前往antd icon选择图标 例如：HomeOutlined ',
        }}
      />

      <ProFormDigit label="顺序" name="sort" />
    </ModalForm>
  );
};

export default forwardRef(OperateModal);
