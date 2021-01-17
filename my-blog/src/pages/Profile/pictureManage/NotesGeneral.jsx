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
  message,
} from "antd";
import { getAllPhotoList } from "services/home";
// import Upload from "./upload";
import { UploadOutlined } from "@ant-design/icons";

import {
  uploadPhoto,
  deletePhotos,
  getDemoList,
  uploadNotes,
  clearNotes
} from "services/profile";

const NotesGeneral = () => {
  const [photoList, setPhotoList] = useState([]);
  const [notesList, setNotesList] = useState([]);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [tempRow, setTempRow] = useState({});
  const [tableLoading, setTableLoading] = useState(false);
  const [htmlList, setHtmlList] = useState([]);
  // const [imgs, setImgs] = useState("");
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  useEffect(() => {
    _getDemoList();
  }, []);
  useEffect(() => {
    if (!uploadModalVisible) {
      form.setFieldsValue({
        preview: "",
        img: [],
        htmlFile: [],
        status: 1,
        title: "",
      });
      setFileList([]);
      setHtmlList([]);
      setTempRow({});
    }
  }, [uploadModalVisible]);

  const _getDemoList = async () => {
    try {
      setTableLoading(true);
      const notes = await getDemoList(1, 20);
      setNotesList(notes);
      setTableLoading(false);
    } catch (error) {
      console.log("getDemoList", error);
    }
  };

  // 上传筆記请求
  const _uploadNotes = async (data) => {
    try {
      await uploadNotes(data);
    } catch (error) {
      console.log("uploadPhoto err");
    }
  };

  const _clearNotes = async () => {
    try {
      await clearNotes();
      await _getDemoList();
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
      title: "Preview",
      dataIndex: "preview",
      ellipsis: true,
    },
    {
      title: "htmlUrl",
      dataIndex: "htmlUrl",
      ellipsis: true,
    },
    {
      title: "imgUrl",
      dataIndex: "img",
      ellipsis: true,
    },
    {
      title: "htmlName",
      dataIndex: "htmlName",
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
          {/* <a>删除</a> */}
        </Space>
      ),
    },
  ];

  // const handleModalOk = () => {
  //   console.log("ok");
  // };

  const handleModalCancel = () => {
    setUploadModalVisible(false);
    // console.log("cancel");
  };

  const handleEdit = (row) => {
    // const { current } = uploadRef;
    // console.log("form", form);
    if (row.id) {
      console.log("row", row);
      form &&
        form.setFieldsValue({
          ...row,
          img: [
            {
              uid: row.id,
              name: row.title,
              status: "done",
              url: row.img,
            },
          ],
          // htmlFile: [
          //   {
          //     uid: row.id,
          //     name: row.title,
          //     status: "done",
          //     url: row.htmlUrl,
          //   },
          // ],
        });
      row.htmlUrl &&
        setHtmlList([
          {
            uid: row.id,
            name: row.title,
            status: "done",
            url: row.htmlUrl,
          },
        ]);
      setFileList([
        {
          url: row.img,
        },
      ]);
      setTempRow(row);
    }
    setUploadModalVisible(true);
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      console.log("values", values);
      const { img, title, htmlFile, status, preview } = values;
      formData.append("title", title);
      formData.append("preview", preview);
      formData.append("status", status);
      if (!img.length) {
        throw new Error("noFile");
      }
      if (img && img.length) {
        !img[0].url && formData.append("image", img[0].originFileObj);
      }
      if (htmlFile && htmlFile.length) {
        formData.append("htmlContent", htmlFile[0].originFileObj);
      }

      if (tempRow.id) {
        htmlList.length && formData.append("htmlName", tempRow.htmlName);
        formData.append("id", tempRow.id);
      }

      await _uploadNotes(formData);
      setUploadModalVisible(false);
      await _getDemoList();
    } catch (error) {
      if (error.message === "noFile") {
        message.error("请上传封面");
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
  const handleRemoveHtml = () => {
    setHtmlList([]);
  };

  const handleDeletePhotos = () => {
    _clearNotes();
  };

  return (
    <div>
      <Button onClick={handleEdit}>添加</Button>
      <Button onClick={handleDeletePhotos}>clear</Button>
      <Table
        columns={columns}
        dataSource={notesList}
        rowKey="id"
        loading={tableLoading}
      />
      <Modal
        title="图片上传"
        visible={uploadModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          name="validate_other"
          form={form}
          {...formItemLayout}
          onFinish={onFinish}
        >
          <Form.Item
            name="title"
            label="title"
            rules={[
              { required: true, message: "Please input title !" },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item name="preview" label="preview">
            <Input.TextArea></Input.TextArea>
          </Form.Item>
          <Form.Item
            name="status"
            label="visible"
            rules={[
              { required: true, message: "Please select photo visible !" },
            ]}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={1}>html</Radio.Button>
              <Radio.Button value={2}>html&&demo</Radio.Button>
              <Radio.Button value={0}>delete</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="htmlFile"
            rules={[{ required: true, message: "Please upload photo !" }]}
          >
            <Form.Item
              name="htmlFile"
              valuePropName="htmlList"
              getValueFromEvent={normFile}
              label="htmlFile"
              noStyle
            >
              <Upload
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                // listType="picture-card"
                defaultFileList={htmlList}
                onRemove={handleRemoveHtml}
                // fileList={htmlList}
                // onChange={onChange}
                // onPreview={onPreview}
                beforeUpload={handleBeforeUploadFile}
              >
                <Button icon={<UploadOutlined />}>Click to HtmlFile</Button>
              </Upload>
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="uploadCover"
            rules={[{ required: true, message: "Please upload photo !" }]}
          >
            <Form.Item
              name="img"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              label="img"
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
export default memo(NotesGeneral);
