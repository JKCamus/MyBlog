import React, { memo } from "react";
import { Form, Select, Slider, Button, Upload, Input, Col } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
const UploadDemo = (props) => {
  const { Option } = Select;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        ["input-number"]: 3,
        ["checkbox-group"]: ["A", "B"],
        rate: 3.5,
      }}
    >
      <Form.Item name="title" label="title">
        <Input></Input>
      </Form.Item>
      <Form.Item name="content" label="content">
        <Input.TextArea></Input.TextArea>
      </Form.Item>
      <Form.Item label="Dragger">
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default memo(UploadDemo);
