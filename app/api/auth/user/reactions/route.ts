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

  const { data: userSession, error: sessionError } = await supabase.auth.getSession();

  try {
    if (userSession) {
      const { session } = userSession;
      const userId = session?.user.id;
      if (sessionError) {
        throw Error('get session error');
      }

      const { data: userReactions, error: userReactionsError } = await supabase
        .from('user_reactions')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (userReactionsError) {
        NextResponse.json({
          userReactionsError,
          success: false,
        });
      }

      return NextResponse.json({
        ...userReactions?.reactions,
        success: true,
      });
    }

    return NextResponse.redirect(`${host}/error/500`);
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}

export async function PUT(request: Request) {
  const host = getHost();

  const supabase = await createClient();
  const bodyData = await request.json();

  try {
    const { data } = await supabase.auth.getSession();
    const { error } = await supabase
      .from('user_reactions')
      .update({ reactions: { ...bodyData } })
      .eq('user_id', data.session?.user.id);

    // TODO: error 처리 프론트 or 백 결정 필요.
    return NextResponse.json({ success: error ? false : true, error });
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
