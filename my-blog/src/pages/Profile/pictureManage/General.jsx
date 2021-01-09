import React, { memo, useEffect, useState, useRef } from "react";
import {
  Table,
  Tag,
  Space,
  Modal,
  Form,
  Select,
  Button,
  Upload,
  Input,
  Radio,
} from "antd";
import { getAllPhotoList } from "services/home";
// import Upload from "./upload";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

import { uploadPhoto } from "services/profile";

const General = (props) => {
  const [photoList, setPhotoList] = useState([]);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [imgs, setImgs] = useState("");
  const { Option } = Select;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const uploadRef = useRef();
  useEffect(() => {
    _getPhotoList();
  }, []);
  // 请求所有照片信息
  const _getPhotoList = async () => {
    try {
      const photos = await getAllPhotoList(1, 20);
      const newPhotos = photos.map((item) => {
        return {
          ...item,
          key: item.id,
        };
      });
      setPhotoList(newPhotos);
    } catch (error) {
      console.log("err", error);
    }
  };

  // 上传图片请求
  const _uploadPhoto = async (data) => {
    try {
      await uploadPhoto(data);
    } catch (error) {
      console.log("await");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "title",
      dataIndex: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
    },
    {
      title: "Size",
      dataIndex: "size",
    },
    {
      title: "url",
      dataIndex: "url",
    },
    {
      title: "width",
      dataIndex: "width",
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "Action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  const handleModalOk = () => {
    console.log("ok");
  };

  const handleModalCancel = () => {
    setUploadModalVisible(false);
    // console.log("cancel");
  };

  const handleEdit = (row) => {
    // const { current } = uploadRef;
    if (row.id) {
      form && form.setFieldsValue(row);
    }
    // console.log("form", form);
    setUploadModalVisible(true);
    // console.log("current", current);
  };

  const onFinish = (values) => {
    const formData = new FormData();
    const { dragger, content, title, width = 4 } = values;
    formData.append("title", title);
    formData.append("content", content);
    formData.append("width", width);
    if (dragger && dragger.length) {
      formData.append("photo", dragger[0].originFileObj);
    }
    _uploadPhoto(formData);
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

  return (
    <div>
      <Button onClick={handleEdit}>添加</Button>
      <Table columns={columns} dataSource={photoList} rowKey="id" />
      {/* <Test ref={uploadRef}></Test> */}
      <Modal
        title="图片上传"
        visible={uploadModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={null}
        destroyOnClose={true}
      >
        {/* <Upload ref={uploadRef} ></Upload> */}
        <Form
          name="validate_other"
          form={form}
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
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={4}>Horizontal</Radio.Button>
              <Radio.Button value={3}>Vertical</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="status" label="content">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={0}>删除</Radio.Button>
              <Radio.Button value={1}>展示</Radio.Button>
              <Radio.Button value={2}>隐藏</Radio.Button>
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
      </Modal>
    </div>
  );
};
export default memo(General);
