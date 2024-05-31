import React from 'react'
import { signIn, signOut, auth } from '@/lib/auth'
import { Button } from 'antd'

function SignIn({ ...props }) {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('github')
      }}
    >
      <Button type="primary" htmlType="submit" {...props}>
        Sign In
      </Button>
    </form>
  )
}

function SignOut(props) {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <Button htmlType="submit" {...props}>
        Sign Out
      </Button>
    </form>
  )
}

const CMS: React.FC = async () => {
  const session = await auth()

  return (
    <div>
      {session?.user ? (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          {session?.user.name}
          <SignOut />
        </span>
      ) : (
        <SignIn />
      )}
    </div>
  )
}

export default CMS
