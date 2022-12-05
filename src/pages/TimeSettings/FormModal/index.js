import {
  ModalForm,
  ProFormTimePicker,
  ProFormText
} from "@ant-design/pro-components";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, message } from "antd";
import React from "react";
import { addTimeSettings } from "@/services/timeSettings";
import moment from "moment";

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};

const FormModal = props => {
  const { trigger, data, reset } = props;
  const [form] = Form.useForm();
  const { id, name, startTime: propsStartTime, endTime: propsEndTime } =
    data || {};

  const onSubmit = async values => {
    const {
      timeRange: [startTime, endTime],
      ...rest
    } = values || {};
    const newId = await addTimeSettings({ ...rest, startTime, endTime, id });
    message.success(data ? "修改成功" : "新建成功");
    reset(newId);
    return true;
  };

  return (
    <ModalForm
      width={600}
      layout="horizontal"
      {...formLayout}
      title={data ? "编辑课后时间安排" : "新建课后时间安排"}
      trigger={
        trigger || (
          <Button type="primary">
            <PlusOutlined />
            新建课后时间安排
          </Button>
        )
      }
      initialValues={{
        name,
        timeRange: data
          ? [moment(propsStartTime, "HH:mm"), moment(propsEndTime, "HH:mm")]
          : undefined
      }}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true
      }}
      submitTimeout={2000}
      onFinish={onSubmit}
    >
      <ProFormText
        layout="horizontal"
        width="md"
        name="name"
        label="时间安排名称"
        placeholder="请输入名称"
        required
        rules={[{ required: true, message: "时间安排名称不能为空" }]}
        fieldProps={{
          showCount: true,
          maxLength: 10,
          style: { width: "100%" }
        }}
      />
      <ProFormTimePicker.RangePicker
        layout="horizontal"
        name="timeRange"
        label="时间区间"
        required
        rules={[{ required: true, message: "时间区间不能为空" }]}
        fieldProps={{
          format: "HH:mm",
          style: { width: "100%" }
        }}
      />
    </ModalForm>
  );
};

export default FormModal;
