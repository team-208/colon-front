import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';
import { InsertPostReportRequest } from './type';
import dayjs from 'dayjs';

export async function POST(request: Request) {
  const host = getHost();

  const supabase = await createClient();
  const bodyData = (await request.json()) as InsertPostReportRequest;

  try {
    const { data: userSession } = await supabase.auth.getSession();

    if (userSession) {
      const { session } = userSession;
      const userId = session?.user.id;

      const { postId, commentId, reason, status, userNickname } = bodyData;

      const { error: insertError } = await supabase.from('scraps').insert({
        user_id: userId,
        post_id: postId,
        commentId: commentId ?? '',
        user_nickname: userNickname,
        reason,
        status,
        updated_at: dayjs(),
      });

      if (insertError) {
        return NextResponse.json({ success: false, insertError });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.redirect(`${host}/error/500`);
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
