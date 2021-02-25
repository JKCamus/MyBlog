import React, { memo, useEffect, useState } from "react";
import {
  Table,
  Space,
  Modal,
  Form,
  Button,
  Upload,
  Input,
  Radio,
  message,
} from "antd";
import { getAllPhotoList } from "services/home";
// import Upload from "./upload";
// import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { changePhotoRenderAction } from "pages/Home/store/actionCreators";
import { useDispatch } from "react-redux";

import { uploadPhoto, deletePhotos, updatePhoto } from "services/profile";

const General = () => {
  const [photoList, setPhotoList] = useState([]);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [tempRow, setTempRow] = useState({});
  const [tableLoading, setTableLoading] = useState(false);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  useEffect(() => {
    _getPhotoList();
  }, []);
  useEffect(() => {
    if (!uploadModalVisible) {
      // form.setFieldsValue({
      //   content: "",
      //   dragger: [],
      //   status: 1,
      //   title: "",
      //   width: 4,
      // });
      setFileList([]);
      setTempRow({});
    }
  }, [uploadModalVisible]);

  // 请求所有照片信息
  const _getPhotoList = async () => {
    try {
      setTableLoading(true);
      const photos = await getAllPhotoList(1, 20);
      const newPhotos = photos.map((item) => {
        return {
          ...item,
          key: item.id,
        };
      });
      setPhotoList(newPhotos);
      setTableLoading(false);
    } catch (error) {
      console.log("_getPhotoList", error);
    }
  };

  // 上传图片请求
  const _uploadPhoto = async (data) => {
    try {
      await uploadPhoto(data);
    } catch (error) {
      console.log("uploadPhoto err");
    }
  };
  const _updatePhoto = async (data) => {
    try {
      await updatePhoto(data);
    } catch (error) {
      console.log("uploadPhoto err");
    }
  };

  const _deletePhotos = async () => {
    try {
      await deletePhotos();
      await _getPhotoList();
    } catch (error) {
      console.log("deletePhotos error");
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
      ellipsis: true,
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
          <a  onClick={() => handleEdit(record)}>编辑</a>
          {/* <a>删除</a> */}
        </Space>
      ),
    },
  ];

  const handleModalCancel = () => {
    form.resetFields();
    setUploadModalVisible(false);
  };

  const handleEdit = (row) => {
    if (row.id) {
      form &&
        form.setFieldsValue({
          ...row,
          dragger: [
            {
              uid: row.id,
              name: row.title,
              status: "done",
              url: row.url,
            },
          ],
        });
      setFileList([
        {
          url: row.url,
        },
      ]);
      setTempRow(row);
    }
    setUploadModalVisible(true);
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      const { dragger, content, title, width = 4, status } = values;
      if (!dragger.length) {
        throw new Error("noFile");
      }
      formData.append("title", title);
      formData.append("content", content);
      formData.append("width", width);
      formData.append("status", status);
      if (dragger && dragger.length) {
        formData.append("photo", dragger[0].originFileObj);
      }
      if (tempRow.id) {
        formData.append("filename", tempRow.filename);
        formData.append("mimetype", tempRow.mimetype);
        formData.append("size", tempRow.size);
        formData.append("id", tempRow.id);
        await _updatePhoto(formData);
      } else {
        await _uploadPhoto(formData);
      }
      form.resetFields();
      setUploadModalVisible(false);
      _getPhotoList();
      dispatch(changePhotoRenderAction(true));
    } catch (error) {
      if (error.message === "noFile") {
        message.error("请上传图片");
      }
      console.log("error", error);
    }
  };

  const handleBeforeUploadFile = (file) => {
    return false;
  };

  const normFile = (e) => {
    // console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const handleDeletePhotos = () => {
    _deletePhotos();
  };

  return (
    <div>
      <Button onClick={handleEdit}>添加</Button>
      <Button onClick={handleDeletePhotos}>clear</Button>
      <Table
        columns={columns}
        dataSource={photoList}
        rowKey="id"
        loading={tableLoading}
      />
      <Modal
        title="图片上传"
        visible={uploadModalVisible}
        // onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={null}
        destroyOnClose={true}
      >
        {/* <Upload ref={uploadRef} ></Upload> */}
        <Form
          name="photoGeneral"
          form={form}
          {...formItemLayout}
          onFinish={onFinish}
          // initialValues={{
          //   ["id"]: undefined,
          // }}
        >
          <Form.Item
            name="title"
            label="title"
            rules={[
              { required: true, message: "Please input photo's title !" },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item name="content" label="content">
            <Input.TextArea></Input.TextArea>
          </Form.Item>
          <Form.Item
            name="width"
            label="scale"
            rules={[{ required: true, message: "Please select photo scale !" }]}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={4}>4:3</Radio.Button>
              <Radio.Button value={3}>3:4</Radio.Button>
              <Radio.Button value={1}>1:1</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="status"
            label="visible"
            rules={[
              { required: true, message: "Please select photo visible !" },
            ]}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={1}>show</Radio.Button>
              <Radio.Button value={2}>hidden</Radio.Button>
              <Radio.Button value={0}>delete</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="upload"
            rules={[{ required: true, message: "Please upload photo !" }]}
          >
            <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              label="Dragger"
              noStyle
            >
              <Upload
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                // fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                beforeUpload={handleBeforeUploadFile}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
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
