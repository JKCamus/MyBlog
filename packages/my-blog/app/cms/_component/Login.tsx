'use client'

import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { loginUser } from '../actions'

const Login: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    try {
      const { email, password } = await form.validateFields()
      const result = await loginUser({ email, password })

      if (result?.error) {
        message.error(result?.error)
      }
    } catch (err) {
      message.error('登录失败，请重试')
      console.log('error', err)
    }
  }

  return (
    <Form form={form} name="login" onFinish={onFinish}>
      <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="请输入密码"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
