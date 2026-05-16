import { ModalForm } from '@ant-design/pro-components';
import { useBoolean } from 'ahooks';
import {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';

const ConfigAuthModal: ForwardRefRenderFunction<{ actionRef: any }, any> = (
  { actionRef },
  ref,
) => {
  const [visble, { setTrue, setFalse }] = useBoolean(false);
  const [record, setRecord] = useState<any>({});

  console.log(actionRef, 'actionRef');
  console.log(record, 'record');

  // 打开弹框
  const handleOpenModal = (row: any) => {
    setRecord(row);
    setTrue();
  };

  // 暴露子组件方法 和数据
  useImperativeHandle(ref as any, () => {
    return {
      handleOpenModal,
    };
  });
  return (
    <ModalForm
      title="配置权限"
      width="50%"
      open={visble}
      modalProps={{ onCancel: setFalse, destroyOnClose: true }}
    >
      ConfigAuthModal
    </ModalForm>
  );
};

export default forwardRef(ConfigAuthModal);
