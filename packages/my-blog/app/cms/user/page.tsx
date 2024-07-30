'use client'
import { Button, Form, Input, Modal, Space, Table, message, type TableProps } from 'antd'

import { useEffect, useState } from 'react'
import { UserData } from '../actions'
import { delUser, fetchAllUser, updateUserInfo } from '@/lib/actions/userAction'

const UserPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)

  const [form] = Form.useForm()

  useEffect(() => {
    getUserData()
  }, [])

  const columns: TableProps<UserData>['columns'] = [
    {
      title: 'userName',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: UserData) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.userId)}>Delete</Button>
        </Space>
      ),
    },
  ]


  const getUserData = async () => {
    try {
      const result = await fetchAllUser()
      setUserData(result)
    } catch (error) {
      message.error(error)
      console.log('error', error)
    }
  }

  const handleEdit = (record: UserData) => {
    form.setFieldsValue(record)
    setCurrentUser(record)
    setIsModalVisible(true)
  }

  const handleDelete = async (userId: string) => {
    try {
      await delUser(userId)
      message.success('删除成功')
      getUserData()
    } catch (error) {
      message.error(error.message)
      console.log('error', error)
    }
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      await updateUserInfo({
        userName: values?.userName,
        userId: currentUser?.userId || '',
      })
      message.success('修改成功')
      setIsModalVisible(false)
      form.resetFields()
      getUserData()
    } catch (error) {
      message.error(error.message)
      console.log(error.message)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Table columns={columns} dataSource={userData} />
      <Modal
        title={currentUser ? 'Edit User Info' : 'Add User Info'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="userName"
            rules={[{ required: true, message: 'Please input the user name!' }]}
          >
            <Input placeholder="User Name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default UserPage
