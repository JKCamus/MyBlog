import React from 'react'
import { auth, signOut } from '@/lib/auth'
import { Button } from '@nextui-org/react'
import Login from './_component/Login'

const CMS: React.FC = async () => {
  const session = await auth()

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
