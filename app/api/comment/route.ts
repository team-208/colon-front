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

      const { data: postData, error: getPostError } = await supabase
        .from('posts')
        .select('comments_count')
        .eq('id', bodyData.postId)
        .single();

      if (getPostError) {
        return NextResponse.json({ success: false, getPostError });
      }

      const { error: updatePostError } = await supabase
        .from('posts')
        .update({
          comments_count: postData.comments_count - 1 >= 0 ? postData.comments_count - 1 : 0,
        })
        .eq('id', bodyData.postId);

      if (updatePostError) {
        return NextResponse.json({ success: false, updatePostError });
      }

      const { error: updateError } = await supabase
        .from('comments')
        .update({
          comment: '삭제된 댓글 입니다.',
          updated_at: dayjs(),
          author_nickname: null,
        })
        .eq('id', bodyData.commentId)
        .eq('user_id', userId);

      return NextResponse.json({ success: updateError ? false : true, updateError });
    }

    return NextResponse.redirect(`${host}/error/500`);
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
