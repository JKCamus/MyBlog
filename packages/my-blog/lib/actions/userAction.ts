'use server'

import dayjs from 'dayjs'
import { auth, signIn } from '../auth'
import { addUser, deleteUser, getAllUsers, updateUser } from '../prismaClientUtils'
import { userAddSchema, userDelSchema, userModifySchema } from '../schema/userSchema'

export async function registerUser(data) {
  const result = userAddSchema.safeParse(data)

  if (!result.success) {
    console.error('Validation error:', result.error)
    throw new Error(result.error.issues[0].message)
  }

  const { email, password } = result.data

  try {
    const result = await addUser(email, password)
    return result
  } catch (error) {
    console.log('error', error)
    throw new Error('User Register Failed. Please try again later.')
  }
}

export async function loginUser(data) {
  const result = userModifySchema.safeParse(data)

  if (!result.success) {
    console.error('Validation error:', result.error)
    throw new Error(result.error.issues[0].message)
  }

  try {
    const loginInfo = await signIn('credentials', {
      ...result,
      redirectTo: '/cms/blog',
    })
    return loginInfo
  } catch (error) {
    console.error('Error loginUser in action:', error)
    throw new Error('Login Failed. Please try again later.')
  }
}

export const loginWidthGithub = async () => {
  await signIn('github', {
    redirectTo: '/cms/blog',
  })
}

export async function fetchAllUser() {
  try {
    const user = await getAllUsers()
    const users = user.map((item) => ({
      key: item.id,
      userId: item.id,
      userName: item.name || '',
      email: item.email,
      createdAt: dayjs(item.createdAt).format('YYYY-MM-DD'),
    }))
    return users
  } catch (error) {
    console.error('Error fetchAllUser in action:', error)
    throw new Error('Failed to get all users. Please try again later.')
  }
}

export async function updateUserInfo(data) {
  const result = userModifySchema.safeParse(data)
  if (!result.success) {
    console.error('Validation error:', result.error)
    throw new Error(result.error.issues[0].message)
  }
  const { userId, userName } = result.data
  try {
    await updateUser(userId, userName)
    return
  } catch (error) {
    console.error('Error updateUserInfo in action:', error)
    throw new Error('Failed to update user info. Please try again later.')
  }
}

export async function delUser(id) {
  const result = userDelSchema.safeParse(id)
  if (!result.success) {
    console.error('Validation error:', result.error)
    throw new Error(result.error.issues[0].message)
  }
  const userId = result.data

  try {
    const session = await auth()
    const isCurrentUser = session?.user?.id === userId

    if (isCurrentUser) {
      throw new Error('不能删除当前用户')
    }
    await deleteUser(userId)
  } catch (error) {
    console.error('Error delUser in action:', error)
    throw new Error('Failed to delete user. Please try again later.')
  }
}
