'use client'
import { useState, useEffect } from 'react'
import { Table, TableProps, Button, Modal, Form, Input, Space, Tag, message } from 'antd'
import {
  createTagAction,
  delTagAction,
  getAllTagsAction,
  updateTagAction,
} from '@/lib/actions/tagAction'

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
    try {
      const tags = await getAllTagsAction()
      const tagsData = tags.map((item) => ({
        key: item.id,
        tagName: item.tagName,
        tagId: item.id,
      }))
      setTagsData(tagsData)
    } catch (error) {
      message.error(error.message)
    }
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
    try {
      await delTagAction(tagId)
      message.success('删除成功')
      fetchTags()
    } catch (error) {
      message.error(error.message)
    }
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      if (currentTag) {
        await updateTagAction({ tagId: currentTag.key, tagName: values.tagName })
        message.success('修改成功')
      } else {
        await createTagAction(values.tagName)
        message.success('新增成功')
      }
      setIsModalVisible(false)
      form.resetFields()
      fetchTags()
    } catch (error) {
      message.error(error.message)
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
