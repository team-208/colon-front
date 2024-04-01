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

    const { data: userInfo, error: userInfoError } = await supabase.from('user_info').select('*');
    if (userInfoError) {
      throw Error('user info error');
    }

    return NextResponse.json(
      isEmpty(userInfo) ? {} : { ...data.session, user: { profile_url: userInfo[0].profile_url } },
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
