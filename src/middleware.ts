import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for our API endpoint
  if (request.nextUrl.pathname.startsWith('/api/v1/')) {
    // Clone the request headers
    const requestHeaders = new Headers(request.headers)

    // Add CORS headers
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    return response
  }
}

export const config = {
  matcher: '/api/v1/:path*',
}