import React from 'react'
import { signIn, signOut, auth } from "@/lib/auth"

function SignIn({
  provider,
  ...props
}) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <button {...props}>Sign In</button>
    </form>
  )
}

function SignOut(props) {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button {...props}>
        Sign Out
      </button>
    </form>
  )
}

const CMS: React.FC = async() => {
  const session = await auth()

  return <div>      {
    session?.user
      ? <span style={{ display: "flex", "alignItems": "center" }}>{session?.user.name}<SignOut /></span>
      : <SignIn />
  }</div>
}

export default CMS




