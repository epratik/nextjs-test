import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request) {
    return NextResponse.next()
//   if (request.nextUrl.pathname.startsWith('/about')) {
//     return NextResponse.rewrite(new URL('/about-2', request.url))
//   }

//   if (request.nextUrl.pathname.startsWith('/dashboard')) {
//     return NextResponse.rewrite(new URL('/dashboard/user', request.url))
//   }
}

export const config = {
    matcher: '*',
  }