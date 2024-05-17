import { addUser } from '@/lib/prismaClientUtils'
import { NextResponse } from 'next/server'

export async function POST(request) {
  // 获取 POST 请求body 的数据
  try {
    const { username, password } = await request.json()
    if (!username || !password) {
      return NextResponse.json({ error: '账号/密码不能为空' }, { status: 500 })
    }
    const res = await addUser(username, password)
    return NextResponse.json({ res })
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
