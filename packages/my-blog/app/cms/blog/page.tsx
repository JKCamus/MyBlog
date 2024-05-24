'use client'

import { useState, useEffect } from 'react'
import { Table, TableProps, Button, Modal, Form, Input, Space, Tag, Select } from 'antd'
import { createBlog, modifyBlog, removeBlog, fetchAllBlogs, getAllTags } from '../actions'
import { BlogLayout, Tags } from '@prisma/client'

interface BlogDataType {
  key: number
  title: string
  summary?: string
  userName: string
  layout: string
  tags: Tags[]
}

const LayoutOptions = [
  { value: BlogLayout.PostLayout, label: 'PostLayout' },
  { value: BlogLayout.PostBanner, label: 'PostBanner' },
  { value: BlogLayout.PostSimple, label: 'PostSimple' },
]

interface TagsOptions {
  value: string
  label: string
}

const BlogsPage: React.FC = () => {
  const [blogsData, setBlogsData] = useState<BlogDataType[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentBlog, setCurrentBlog] = useState<BlogDataType | null>(null)
  const [tagsOptions, setTagsOptions] = useState<TagsOptions[]>([])
  const [form] = Form.useForm()

  useEffect(() => {
    fetchBlogs()
    fetchTags()
  }, [])

  const fetchBlogs = async () => {
    const blogs = await fetchAllBlogs()
    setBlogsData(blogs)
  }

  const fetchTags = async () => {
    const tags = await getAllTags()
    const options = tags.map((tag) => ({
      value: tag.id,
      label: tag.tagName,
    }))
    setTagsOptions(options)
  }

  const handleAdd = () => {
    form.resetFields()
    setCurrentBlog(null)
    setIsModalVisible(true)
  }

  const handleEdit = (record: BlogDataType) => {
    form.setFieldsValue({
      title: record.title,
      summary: record.summary,
      userName: record.userName,
      layout: record.layout,
      tags: record.tags.map(tag => tag.id),
    })
    setCurrentBlog(record)
    setIsModalVisible(true)
  }

  const handleDelete = async (blogId: number) => {
    await removeBlog({ blogId: Number(blogId) })
    fetchBlogs()
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      const data = {
        ...values,
        tags: values.tags.split(','),
      }
      if (currentBlog) {
        await modifyBlog({ blogId: Number(currentBlog.key), ...data })
      } else {
        await createBlog(data)
      }
      setIsModalVisible(false)
      form.resetFields()
      fetchBlogs()
    } catch (error) {
      console.log('Validate Failed:', error)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onLayoutChange = (value) => { }

  const columns: TableProps<BlogDataType>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Summary',
      dataIndex: 'summary',
      key: 'summary',
    },
    {
      title: 'UserName',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Layout',
      dataIndex: 'layout',
      key: 'layout',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: Tags[]) =>
        tags.map((tag) => (
          <Tag key={tag.id} color="volcano">
            {tag.tagName}
          </Tag>
        )),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: BlogDataType) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.key)}>Delete</Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Button type="primary" onClick={handleAdd}>
        Add Blog
      </Button>
      <Table columns={columns} dataSource={blogsData} />
      <Modal
        title={currentBlog ? 'Edit Blog' : 'Add Blog'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="summary"
            label="Summary"
            rules={[{ required: false, message: 'Please input the summary!' }]}
          >
            <Input placeholder="Summary" />
          </Form.Item>
          <Form.Item
            name="layout"
            label="Layout"
            rules={[{ required: false, message: 'Please input the layout!' }]}
            initialValue={BlogLayout.PostLayout}
          >
            <Select
              style={{ width: 120 }}
              onChange={onLayoutChange}
              options={LayoutOptions}
            />
          </Form.Item>
          <Form.Item
            label="Tags"
            name="tags"
            rules={[{ required: false, message: 'Please input the tags!' }]}
          >
            <Select
              mode="multiple"
              placeholder="Please select"
              onChange={onLayoutChange}
              style={{ width: '100%' }}
              options={tagsOptions}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default BlogsPage
