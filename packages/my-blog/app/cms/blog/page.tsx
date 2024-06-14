'use client'

import { useState, useEffect } from 'react'
import {
  Table,
  TableProps,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Tag,
  Select,
  Upload,
  message,
} from 'antd'
import { createBlog, modifyBlog, removeBlog, fetchAllBlogs, getAllTags } from '../actions'
import { BlogLayout, Tags } from '@prisma/client'
import { UploadOutlined } from '@ant-design/icons'

const { TextArea } = Input

interface BlogDataType {
  key: number
  title: string
  summary?: string
  userName: string
  layout: BlogLayout
  tags: Tags[]
}

const LayoutOptions = Object.values(BlogLayout).map((layout) => ({ value: layout, label: layout }))

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
    fetchInitData()
  }, [])

  const fetchInitData = async () => {
    await Promise.all([fetchBlogs(), fetchTags()])
  }

  const fetchBlogs = async () => {
    try {
      const blogs = await fetchAllBlogs()
      setBlogsData(blogs)
    } catch (error) {
      console.error('Error fetching blogs:', error)
      message.error('Failed to fetch blogs.')
    }
  }

  const fetchTags = async () => {
    try {
      const tags = await getAllTags()
      setTagsOptions(tags?.map((tag) => ({ value: tag?.id, label: tag?.tagName })))
    } catch (error) {
      console.error('Error fetching tags:', error)
      message.error('Failed to fetch tags.')
    }
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
      tags: record.tags.map((tag) => tag.id),
    })
    setCurrentBlog(record)
    setIsModalVisible(true)
  }

  const handleDelete = async (blogId: number) => {
    try {
      await removeBlog({ blogId: blogId })
      fetchBlogs()
      message.success('Delete blog successfully')
    } catch (error) {
      message.error('Delete blog fail')
    }
  }

  const fileChange = (info) => {
    const { status } = info.file
    if (status === 'error') {
      message.error(`${info.file.name} file add failed.`)
    }
  }

  const handleOk = async () => {
    try {
      const { file, tags, summary, title, layout } = await form.validateFields()
      if (currentBlog) {
        await modifyBlog(currentBlog.key, {
          title,
          summary,
          layout,
          tags,
        })
      } else {
        const formData = new FormData()
        formData.append('title', title)
        summary && formData.append('summary', summary)
        formData.append('layout', layout || BlogLayout.PostLayout)
        tags && formData.append('tags', tags)
        file[0]?.originFileObj && formData.append('file', file[0]?.originFileObj)
        await createBlog(formData)
      }
      setIsModalVisible(false)
      form.resetFields()
      fetchBlogs()
      message.success('File uploaded and blog added successfully')
    } catch (error) {
      console.log(error)
      message.error('Add blog fail')
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

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
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  return (
    <div>
      <Button className="mb-5" type="primary" onClick={handleAdd}>
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
          <Form.Item name="summary" label="Summary">
            <TextArea placeholder="Summary" rows={4} />
          </Form.Item>
          <Form.Item name="layout" label="Layout" initialValue={BlogLayout.PostLayout}>
            <Select style={{ width: 120 }} options={LayoutOptions} />
          </Form.Item>
          <Form.Item label="Tags" name="tags">
            <Select
              mode="multiple"
              placeholder="Please select"
              style={{ width: '100%' }}
              options={tagsOptions}
            />
          </Form.Item>
          {!currentBlog && (
            <Form.Item
              label="Upload"
              name="file"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Please upload file!' }]}
            >
              <Upload onChange={fileChange} maxCount={1} accept=".md,.mdx">
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  )
}

export default BlogsPage
