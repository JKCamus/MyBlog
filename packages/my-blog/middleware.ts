// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from './lib/auth'

export async function middleware(req: NextRequest) {
  const session = await auth()

  const { pathname } = req.nextUrl

  if (pathname === '/cms') {
    return NextResponse.next()
  }

  // 如果没有 token 且访问受保护路径，重定向到登录页
  if (!session?.user && pathname.startsWith('/cms')) {
    return NextResponse.redirect(new URL('/cms', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/cms/:path*'], // 保护的路径
}
