import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Only run middleware on admin routes that need auth protection.
     * Public pages don't need the Supabase session check.
     */
    '/admin/:path*',
  ],
}
