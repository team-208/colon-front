import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { isEmpty } from 'lodash';
import { getHost } from '@/app/utils/host';

// TODO: error handling 논의 필요.
// 공용 에러 페이지로 통일한다면 api단에서 에러 처리.
// 에러 케이스별 화면 변경이 필요하다면 error code response 후 csr로 처리.
export async function GET(request: Request, response: Response) {
  const host = getHost();

  const supabase = await createClient();

  try {
    const { data, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      throw Error('get session error');
    }

    const { data: kakaoUserInfo, error: kakaoUserInfoError } = await supabase.auth.getUser();
    if (kakaoUserInfoError) {
      throw Error('get kakaoUserInfo error');
    }

    const { data: userInfo, error: userInfoError } = await supabase.from('user_info').select('*');
    if (userInfoError) {
      throw Error('user info error');
    }

    return NextResponse.json(
      isEmpty(userInfo)
        ? {}
        : {
            ...data.session,
            user: {
              profile_url: userInfo[0].profile_url,
              nick_name: userInfo[0].nick_name,
              major: userInfo[0].major,
              created_at: userInfo[0].created_at,
              updated_at: userInfo[0].updated_at,
            },
            kakaoUserInfo: kakaoUserInfo?.user?.user_metadata,
          },
    );
  } catch (error) {
    return NextResponse.redirect(`${host}/auth/auth-code-error`);
  }
}

export async function POST(request: Request) {
  const host = getHost();

  const supabase = await createClient();
  const bodyData = await request.json();

  try {
    const { error } = await supabase.from('user_info').insert([{ ...bodyData }]);
    // TODO: error 처리 프론트 or 백 결정 필요.
    return NextResponse.json({ success: error ? false : true });
  } catch (error) {
    return NextResponse.redirect(`${host}/auth/auth-code-error`);
  }
}

export async function PUT(request: Request) {
  const host = getHost();

  const supabase = await createClient();
  const bodyData = await request.json();

  try {
    const { data } = await supabase.auth.getSession();
    const { error } = await supabase
      .from('user_info')
      .update({ ...bodyData })
      .eq('user_id', data.session?.user.id);
    // TODO: error 처리 프론트 or 백 결정 필요.
    return NextResponse.json({ success: error ? false : true, error });
  } catch (error) {
    return NextResponse.redirect(`${host}/auth/auth-code-error`);
  }
}
