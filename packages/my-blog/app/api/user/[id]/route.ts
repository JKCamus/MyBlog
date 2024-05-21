import { getUserById } from '@/lib/prismaClientUtils'
import { NextResponse } from 'next/server'

// 动态路由
// 由于 next 的路由机制，当/api/user/[id] 中 id 为空，其实会打到/api/user/，所以只推荐简单参数获取的在动态路由中

export async function GET(request, { params }) {
  try {
    const { id } = params
    const res = await getUserById(id)
    if (!res) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 })
    }
    return NextResponse.json({ res })
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
