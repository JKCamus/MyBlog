import React, { memo, useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import { getPhotoList } from "services/home";
const General = (props) => {
  const [photoList, setPhotoList] = useState([]);
  const _getPhotoList = async () => {
    try {
      const photos = await getPhotoList(1, 20);
      setPhotoList(photos);
    } catch (error) {
      console.log("err", error);
    }
  };
  useEffect(() => {
    _getPhotoList();
  }, []);

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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>编辑 </a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={photoList} />
    </div>
  );
};
export default memo(General);
