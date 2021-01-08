import React, { memo, useState } from "react";
import { Form, Select, Slider, Button, Upload, Input, Col,Radio } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { uploadPhoto } from "services/profile";

const UploadDemo = (props) => {
  const [fileList, setFileList] = useState([]);
  const [imgs, setImgs] = useState("");
  const { Option } = Select;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const _uploadPhoto = async (data) => {
    try {
      const res = await uploadPhoto(data);
      console.log("resd", res);
    } catch (error) {
      console.log("await");
    }
  };
  const handleBeforeUploadFile = (file) => {
    // 使用 beforeUpload 會失去在選擇圖片後馬上看到圖片的功能，因此利用FileReader方法來實現預覽效果
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setFileList([{ uid: file.uid, url: reader.result }]);
      setImgs(reader.result);
      // this.setState({fileList: [{uid: file.uid, url: reader.result}],image:reader.result})
    }.bind(this);
    // 使用 beforeUpload 回傳 false 可以停止上傳
    return false;
  };
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = (values) => {
    const formData = new FormData();
    const { dragger,content,title,width=4} = values;
    formData.append("title", title);
    formData.append("content", content);
    formData.append("width", width);
    if (dragger.length) {
      formData.append("photo", dragger[0].originFileObj);
    }
    _uploadPhoto(formData);

  };

  return (
    <div>
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
        <Form.Item name="width" label="content">
          <Radio.Group defaultValue={4} buttonStyle="solid">
            <Radio.Button value={4}>Horizontal</Radio.Button>
            <Radio.Button value={3}>Vertical</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Dragger">
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger
              name="files"
              action="/upload.do"
              beforeUpload={handleBeforeUploadFile}
            >
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
    </div>
  );
};
export default memo(UploadDemo);
