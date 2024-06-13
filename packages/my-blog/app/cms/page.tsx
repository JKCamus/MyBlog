import React, { Key } from 'react'
import { auth, signOut } from '@/lib/auth'
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import Login from './_component/Login'


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
          <Button type="submit" color="secondary">
            signOut
          </Button>
        </form>
      ) : (
        <Login></Login>
      )}
    </>
  )
}

export default CMS
