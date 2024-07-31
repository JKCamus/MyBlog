'use client'
import React, { Key, useState } from 'react'
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from '@nextui-org/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, UserFormSchemaType } from '../validateSchema'
import { message } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import {
  loginUserAction,
  loginWidthGithubAction,
  registerUserAction,
} from '@/lib/actions/userAction'
import { useRouter } from 'next/navigation'

enum TabsKey {
  login = 'login',
  signUp = 'signUp',
}

export default function Login() {
  const [selected, setSelected] = useState<Exclude<Key, bigint>>(TabsKey.login)
   const router=useRouter()
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm<UserFormSchemaType>({
    mode: 'all',
    resolver: zodResolver(userSchema),
  })

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: signUpErrors },
  } = useForm<UserFormSchemaType>({
    mode: 'all',
    resolver: zodResolver(userSchema),
  })

  const onLoginSubmit: SubmitHandler<UserFormSchemaType> = async (values) => {
    try {
      const { email, password } = values
      await loginUserAction({ email, password })
    } catch (error) {
      console.log('error', error)
    }
  }

  const onSignUpSubmit: SubmitHandler<UserFormSchemaType> = async (values) => {
    try {
      const { email, password } = values
      const result = await registerUserAction({ email, password })
      if (result?.error) {
        message.error(result?.error)
      } else {
        message.success('注册成功')
        setSelected(TabsKey.login)
      }
    } catch (error) {
      message.error('注册失败，请重试')
      console.log('error', error)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Card className="h-[22rem] w-[20rem] max-w-full">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key={TabsKey.login} title="Login" className="sm:w-unset w-full md:my-auto">
              <form className="flex flex-col gap-4" onSubmit={handleSubmitLogin(onLoginSubmit)}>
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  autoComplete="email"
                  isInvalid={!!loginErrors?.email}
                  errorMessage={loginErrors.email?.message}
                  {...registerLogin('email', { required: true })}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  isInvalid={!!loginErrors?.password}
                  {...registerLogin('password', { required: true })}
                  errorMessage={loginErrors.password?.message}
                  autoComplete="current-password"
                />
                <p className="text-center text-small">
                  Need to create an account?{' '}
                  <Link size="sm" onPress={() => setSelected(TabsKey.signUp)}>
                    Sign up
                  </Link>
                </p>
                <Button fullWidth color="secondary" type="submit">
                  Login
                </Button>
                <Button
                  className="bg-gray-800 text-white"
                  startContent={<GithubOutlined />}
                  onClick={() => loginWidthGithubAction()}
                >
                  GitHub Login
                </Button>
              </form>
            </Tab>
            <Tab key={TabsKey.signUp} title="Sign up" className="sm:w-unset w-full md:my-auto">
              <form className="flex flex-col gap-4" onSubmit={handleSubmitSignUp(onSignUpSubmit)}>
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  autoComplete="email"
                  isInvalid={!!signUpErrors?.email}
                  errorMessage={signUpErrors.email?.message}
                  {...registerSignUp('email')}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  isInvalid={!!signUpErrors?.password}
                  errorMessage={signUpErrors.password?.message}
                  autoComplete="new-password"
                  {...registerSignUp('password')}
                />
                <p className="text-center text-small">
                  Already have an account?{' '}
                  <Link size="sm" onPress={() => setSelected(TabsKey.login)}>
                    Login
                  </Link>
                </p>
                <div className="flex justify-end gap-2">
                  <Button fullWidth color="secondary" type="submit">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  )
}
