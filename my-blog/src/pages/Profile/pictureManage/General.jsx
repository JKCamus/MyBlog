import React, { memo, useEffect, useState } from "react";
import { Table, Tag, Space, Modal, Form, Select,Button} from "antd";
import { getAllPhotoList } from "services/home";
import Upload from "./upload";

const General = (props) => {
  const [photoList, setPhotoList] = useState([]);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  useEffect(() => {
    _getPhotoList();
  }, []);
  const _getPhotoList = async () => {
    try {
      const photos = await getAllPhotoList(1, 20);
      setPhotoList(photos);
    } catch (error) {
      console.log("err", error);
    }
  };



  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "url",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "width",
      dataIndex: "width",
      key: "width",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=>setUploadModalVisible(true)}>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  const handleModalOk = () => {
    console.log("ok");
  };
  const handleModalCancel = () => {
    setUploadModalVisible(false)
    console.log("cancel");
  };

const handleEdit = (params) => {

}

  return (
    <div>
      <Button onClick={()=>{handleEdit()}}>添加</Button>
      <Table columns={columns} dataSource={photoList} />
      <Modal
        title="图片上传"
        visible={uploadModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Upload></Upload>
      </Modal>
    </div>
  );
};
export default memo(General);
