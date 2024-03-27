import { createClient } from '@/app/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const host =
    process.env.NODE_ENV !== 'development'
      ? process.env.NEXT_PUBLIC_PRODUCTION_HOST
      : process.env.NEXT_PUBLIC_DEVELOP_HOST;

  try {
    const next = '/';

    const supabase = await createClient(true);
    const { data: userSession } = await supabase.auth.getSession();

    if (userSession) {
      const { session } = userSession;
      // 카카오 연결 끊기
      await fetch('https://kapi.kakao.com/v1/user/unlink', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + session?.provider_token,
        },
      });

      // supabase user remove
      const { data, error } = await supabase.auth.admin.deleteUser(session?.user?.id || '');

      if (!error) {
        return NextResponse.redirect(`${host}${next}`);
      }
    }

    // 로그인 에러 발생시 redirect
    return NextResponse.redirect(`${host}/auth/auth-code-error`);
  } catch (error) {
    return NextResponse.redirect(`${host}/auth/auth-code-error`);
  }
}

// ref: https://supabase.com/docs/reference/javascript/admin-api
