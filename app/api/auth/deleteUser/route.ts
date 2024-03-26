import { createClient } from '@/app/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const { origin } = new URL(request.url);
    const next = '/';

    const supabase = await createClient(true);
    const { data: userSession } = await supabase.auth.getSession();

    if (userSession) {
      const { session } = userSession;
      // 카카오 연결 끊기
      await fetch('https://kapi.kakao.com/v1/user/unlink', {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + session?.provider_token,
        },
      });

      // supabase user remove
      const { data, error } = await supabase.auth.admin.deleteUser(session?.user?.id || '');

      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }

    // 로그인 에러 발생시 redirect
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  } catch (error) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }
}

// ref: https://supabase.com/docs/reference/javascript/admin-api
