import { NextResponse } from 'next/server'
import { cookies } from "next/headers";

export function middleware(request) {
  const currentUser = request.cookies.get('accessToken')?.value

  console.log(`accessToken: ${request.cookies.get('accessToken')?.value}`)

  if (currentUser === null || currentUser === undefined) {
    if (request.nextUrl.pathname === '/login') {
      return null
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    // return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return null
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
