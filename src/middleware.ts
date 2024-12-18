import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  const isAuth = req.cookies.get('adminAccessToken')?.value

  if (req.nextUrl.pathname === '/auth/sign-in') {
    if (isAuth) {
      return NextResponse.redirect(new URL('/users', req.url))
    } else {
      return NextResponse.next()
    }
  }

  if (!isAuth) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url))
  }

  if (req.nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL('/users', req.url))
  }
}

export const config = {
  matcher: ['/:path*'],
}
