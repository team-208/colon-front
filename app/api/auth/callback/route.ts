import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = '/';

  const supabase = await createClient(true);

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // TODO: 회원가입 여부 판단하기 후 미가입 이용자일 경우 회원가입 페이지로 분기.
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // 로그인 에러 발생시 redirect
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}

// ref: https://supabase.com/docs/guides/auth/server-side/oauth-with-pkce-flow-for-ssr
