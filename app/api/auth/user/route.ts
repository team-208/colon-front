import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { isEmpty } from 'lodash';

// TODO: error handling 논의 필요.
// 공용 에러 페이지로 통일한다면 api단에서 에러 처리.
// 에러 케이스별 화면 변경이 필요하다면 error code response 후 csr로 처리.
export async function GET(request: Request, response: Response) {
  const { origin } = new URL(request.url);
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
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const bodyData = await request.json();

  try {
    const { error } = await supabase.from('user_info').insert([{ ...bodyData }]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }
}
