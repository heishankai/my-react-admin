import {
  ModalForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useBoolean } from 'ahooks';
import { Form, message } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

// types
import type { ModuleType } from '@/types';
import type { ForwardRefRenderFunction } from 'react';

// utils
import { MODULE_TYPE_MAP } from '@/constants';

const OperateModal: ForwardRefRenderFunction<{ actionRef: any }, any> = (
  { actionRef },
  ref,
) => {
  const [form] = Form.useForm();
  const [visble, { setTrue, setFalse }] = useBoolean(false);
  const [modalTitle, setModalTitle] = useState<ModuleType>('add');
  const [, setRecord] = useState<any>(null);

  // 打开弹框
  const handleOpenModal = (type: ModuleType, row?: any) => {
    setModalTitle(type);
    setTrue();
    setRecord(row);

    if (type === 'edit') form.setFieldsValue({ ...row });
  };

  // 表单提交
  const handleFinish = async (values: any) => {
    console.log(values);

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
        status: 1,
      }}
    >
      <ProFormText
        name="role_name"
        label="角色名称"
        rules={[{ required: true }]}
      />

      <ProFormTextArea
        name="remark"
        label="角色备注"
        fieldProps={{
          autoSize: { minRows: 4, maxRows: 4 },
          maxLength: 200,
          showCount: true,
        }}
      />

      <ProFormSwitch name="status" label="状态" />
    </ModalForm>
  );
};

export default forwardRef(OperateModal);
