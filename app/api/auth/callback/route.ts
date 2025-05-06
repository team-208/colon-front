import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { isEmpty } from 'lodash';
import { getHost } from '@/app/utils/host';

// TODO: error handling 논의 필요.
// 공용 에러 페이지로 통일한다면 api단에서 에러 처리.
// 에러 케이스별 화면 변경이 필요하다면 error code response 후 csr로 처리.
export async function GET(request: Request) {
  const host = getHost();

  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const supabase = await createClient(true);

  try {
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        throw Error('exchangeCodeForSession error');
      }

      const { error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        throw Error('get session error');
      }

      const { data: userInfo, error: userInfoError } = await supabase
        .from('user_info')
        .select('*')
        .limit(1)
        .single();

      if (userInfoError) {
        throw Error('user info error');
      }

      if (isEmpty(userInfo)) {
        return NextResponse.redirect(`${host}/signup`);
      }

      if (userInfo.status === 'REPORTED') {
        throw Error('reported user');
      }

      return NextResponse.redirect(`${host}/qna`);
    }
  } catch (error) {
    // 정지 유저 세션 아웃 처리.
    if ((error as Error).message === 'reported user') {
      await supabase.auth.signOut();
      return NextResponse.redirect(`${host}/login?isReported=true`);
    }

    // 로그인 에러 발생시 redirect
    return NextResponse.redirect(`${host}/error/500`);
  }
}

// ref: https://supabase.com/docs/guides/auth/server-side/oauth-with-pkce-flow-for-ssr
