import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';
import dayjs from 'dayjs';
import { InsertCommentRequest } from './type';
import { removeUndefinedValue } from '@/app/utils/converter';

// TODO: 작성자 직군 column 추가 필요.
export async function POST(request: Request) {
  const host = getHost();

  const supabase = await createClient();
  const bodyData = (await request.json()) as InsertCommentRequest;

  try {
    const { data: userSession } = await supabase.auth.getSession();

    if (userSession) {
      const { session } = userSession;
      const userId = session?.user.id;

      const { error: insertError } = await supabase.from('comments').insert([
        {
          ...removeUndefinedValue(bodyData),
          created_at: dayjs(),
          updated_at: dayjs(),
          user_id: userId,
        },
      ]);

      return NextResponse.json({ success: insertError ? false : true, insertError });
    }

    return NextResponse.redirect(`${host}/error/500`);
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
