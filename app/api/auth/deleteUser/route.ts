import { getHost } from '@/app/utils/host';
import { createClient } from '@/app/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const host = getHost();

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
    return NextResponse.redirect(`${host}/error/500`);
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}

// ref: https://supabase.com/docs/reference/javascript/admin-api
