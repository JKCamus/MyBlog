import { addUser, deleteUser, getAllUsers, updateUser } from '@/lib/prismaClientUtils'
import validate from '@/lib/validate'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// 定义 Zod schema
const userSchema = z.object({
  username: z.string().min(1, { message: '用户名不能为空' }),
  password: z.string().min(1, { message: '密码不能为空' }),
})

const userUpdateSchema = z.object({
  userId: z.string().min(1, { message: '用户ID不能为空' }),
  username: z.string().min(1, { message: '用户名不能为空' }),
  password: z.string().min(1, { message: '密码不能为空' }),
})

const userDeleteSchema = z.object({
  userId: z.string().min(1, { message: '用户ID不能为空' }),
})

// 处理 POST 请求（新增 User）
export async function POST(request) {
  try {
    const body = await request.json()
    const { success, data, error } = validate(userSchema, body)

    if (!success) {
      return NextResponse.json({ error }, { status: 400 })
    }
    await addUser(data.username, data.password)
    return NextResponse.json({ message: '新建用户成功' }, { status: 200 })
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}

// 处理 PUT 请求（更新 User）
export async function PUT(request) {
  try {
    const body = await request.json()
    const { success, data, error } = validate(userUpdateSchema, body)

    if (!success) {
      return NextResponse.json({ error }, { status: 400 })
    }

    try {
      await updateUser(data.userId, data.username, data.password)
      return NextResponse.json({ message: '更新用户成功' }, { status: 200 })
    } catch (error) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: '无当前用户' }, { status: 404 })
      }
      throw error
    }
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}

// 处理 GET 请求（获取所有 Users）
export async function GET() {
  try {
    const res = await getAllUsers()
    return NextResponse.json({ res }, { status: 200 })
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}

// 处理 DELETE 请求（删除 User）
export async function DELETE(request) {
  try {
    const body = await request.json()
    const { success, data, error } = validate(userDeleteSchema, body)

    if (!success) {
      return NextResponse.json({ error }, { status: 400 })
    }

    try {
      await deleteUser(data.userId)
      return NextResponse.json({ message: '删除用户成功' }, { status: 200 })
    } catch (error) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: '无当前用户' }, { status: 404 })
      }
      throw error
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors.map((e) => e.message).join(', ') },
        { status: 400 }
      )
    }
    console.log('error', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
