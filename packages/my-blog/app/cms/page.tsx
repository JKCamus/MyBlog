import React from 'react'
import { Tabs, Button } from 'antd'
import { auth, signOut } from '@/lib/auth'
import dynamic from 'next/dynamic';


const Login = dynamic(() => import('./_component/Login'), { ssr: false });
const Register = dynamic(() => import('./_component/Register'), { ssr: false });


const CMS: React.FC = async () => {
  const session = await auth()
  console.log('session', session)

  return (
    <>
      {session?.user ? (
          <form
            action={async () => {
              'use server'
              await signOut()
            }}
          >
            <Button type="primary" htmlType="submit">
              signOut
            </Button>
          </form>
      ) : (
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: '登录',
              key: '1',
              children: <Login />,
            },
            {
              label: '注册',
              key: '2',
              children: <Register />,
            },
          ]}
        ></Tabs>
      )}
    </>
  )
}

export default CMS
