'use client'
import { useState, useEffect } from 'react'
import { Table, TableProps, Button, Modal, Form, Input, Space, Tag } from 'antd'
import { createTag, getAllTags, modifyTag, removeTag } from '../actions'

interface TagsDataType {
  key: string
  tagName: string
  tagId: string
}

const TagsPage: React.FC = () => {
  const [tagsData, setTagsData] = useState<TagsDataType[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentTag, setCurrentTag] = useState<TagsDataType | null>(null)
  const [form] = Form.useForm()

  useEffect(() => {
    fetchTags()
  }, [])

  const fetchTags = async () => {
    const tags = await getAllTags()
    const tagsData = tags.map((item) => ({
      key: item.id,
      tagName: item.tagName,
      tagId: item.id,
    }))
    setTagsData(tagsData)
  }

  const handleAdd = () => {
    form.resetFields()
    setCurrentTag(null)
    setIsModalVisible(true)
  }

  const handleEdit = (record: TagsDataType) => {
    form.setFieldsValue({ tagName: record.tagName })
    setCurrentTag(record)
    setIsModalVisible(true)
  }

  const handleDelete = async (tagId: string) => {
    await removeTag({ tagId })
    fetchTags()
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      if (currentTag) {
        await modifyTag({ tagId: currentTag.key, tagName: values.tagName })
      } else {
        await createTag({ tagName: values.tagName })
      }
      setIsModalVisible(false)
      form.resetFields()
      fetchTags()
    } catch (error) {
      console.log('Validate Failed:', error)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const columns: TableProps<TagsDataType>['columns'] = [
    {
      title: 'TagID',
      dataIndex: 'tagId',
      key: 'tagId',
    },
    {
      title: 'TagName',
      key: 'tagName',
      render: (value: TagsDataType) => <Tag color="volcano">{value.tagName}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: TagsDataType) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.tagId)}>Delete</Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Button className="mb-5" type="primary" onClick={handleAdd}>
        Add Tag
      </Button>
      <Table columns={columns} dataSource={tagsData} />
      <Modal
        title={currentTag ? 'Edit Tag' : 'Add Tag'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="tagName"
            rules={[{ required: true, message: 'Please input the tag name!' }]}
          >
            <Input placeholder="Tag Name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default TagsPage
