import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from './app/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const isLogin = !!request.cookies.get('sb-rlwvcjygwndaidplsnnk-auth-token.0');

  if (request.nextUrl.pathname === '/mypage' || request.nextUrl.pathname === '/qna/write') {
    if (!isLogin) return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  }

  const result = await updateSession(request);
  return result;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/qna/write',
    '/mypage',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
