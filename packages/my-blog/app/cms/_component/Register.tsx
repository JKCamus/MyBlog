'use client';

import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { registerUser } from '../actions';

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async () => {
    try {
      const { email, password } = await form.validateFields();
      const result = await registerUser({ email, password });

      if (result?.error) {
        message.error(result?.error);
      } else {
        router.push('/cms/auth/signIn');
      }
    } catch (err) {
      message.error('注册失败，请重试');
      console.log('error', err);
    }
  };

  return (
    <Form form={form} name="register" onFinish={onFinish}>
      <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入密码" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
