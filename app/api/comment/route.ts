import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';
import dayjs from 'dayjs';
import { DeleteCommentRequest, InsertCommentRequest, UpdateCommentRequest } from './type';
import { removeUndefinedValue } from '@/app/utils/converter';

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
export async function PUT(request: Request) {
  const host = getHost();

  const supabase = await createClient();
  const bodyData = (await request.json()) as UpdateCommentRequest;

  try {
    const { data: userSession } = await supabase.auth.getSession();

    if (userSession) {
      const { session } = userSession;
      const userId = session?.user.id;

      const { error: updateError } = await supabase
        .from('comments')
        .update({ comment: bodyData.comment, updated_at: dayjs() })
        .eq('id', bodyData.commentId)
        .eq('user_id', userId);

      return NextResponse.json({ success: updateError ? false : true, updateError });
    }

    return NextResponse.redirect(`${host}/error/500`);
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}

export async function DELETE(request: Request) {
  const host = getHost();

  const supabase = await createClient();
  const bodyData = (await request.json()) as DeleteCommentRequest;

  try {
    const { data: userSession } = await supabase.auth.getSession();

    if (userSession) {
      const { session } = userSession;
      const userId = session?.user.id;

      const { error: updateError } = await supabase
        .from('comments')
        .update({ comment: '삭제된 댓글 입니다.', updated_at: dayjs(), author_nickname: '' })
        .eq('id', bodyData.id)
        .eq('user_id', userId);

      return NextResponse.json({ success: updateError ? false : true, updateError });
    }

    return NextResponse.redirect(`${host}/error/500`);
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
