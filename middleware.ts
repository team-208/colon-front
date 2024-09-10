import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from './app/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const result = await updateSession(request);
  
  let isLogin = false;
  const list = request.cookies.getAll();
  for (let i = 0; i < list.length; i++) {
    const name = list[i].name;
    if (name.includes('sb') && name.includes('auth') && name.includes('token')) {
      isLogin = true;
      break;
    }
  }

  if (request.nextUrl.pathname === '/mypage' || request.nextUrl.pathname === '/qna/write') {
    if (!isLogin) return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  }

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
