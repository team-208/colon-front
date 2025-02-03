import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';
import dayjs from 'dayjs';
import { DeleteCommentRequest, InsertCommentRequest, UpdateCommentRequest } from './type';
import { removeUndefinedValue } from '@/app/utils/converter';
import { ALARM_CONTENT_TYPES } from '../alarm/constant';

export async function POST(request: Request) {
  const host = getHost();

  const supabase = await createClient();
  const bodyData = (await request.json()) as InsertCommentRequest;

  try {
    const { data: userSession } = await supabase.auth.getSession();

    if (userSession) {
      const { session } = userSession;
      const userId = session?.user.id;

      const { data: postData, error: getPostError } = await supabase
        .from('posts')
        .select('title, comments_count')
        .eq('id', bodyData.post_id)
        .single();

      if (getPostError) {
        return NextResponse.json({ success: false, getPostError });
      }

      const { error: updatePostError } = await supabase
        .from('posts')
        .update({
          comments_count: postData.comments_count + 1,
        })
        .eq('id', bodyData.post_id);

      if (updatePostError) {
        return NextResponse.json({ success: false, updatePostError });
      }

      const { error: insertError } = await supabase.from('comments').insert([
        {
          ...removeUndefinedValue(bodyData),
          created_at: dayjs(),
          updated_at: dayjs(),
          user_id: userId,
        },
      ]);

      const { error: insertAlarmError } = await supabase.from('alarm').insert({
        user_id: userId,
        content_type: bodyData.original_comment
          ? ALARM_CONTENT_TYPES.COMMENT_REPLY
          : ALARM_CONTENT_TYPES.POST_COMMENT,
        content_id: bodyData.original_comment ? bodyData.original_comment : bodyData.post_id,
        content_title: bodyData.original_comment ? bodyData.comment : postData.title,
        message: `${bodyData.author_nickname} 님이 ${
          bodyData.original_comment ? '댓글' : '답변'
        }을 달았어요.`,
      });

      return NextResponse.json({
        success: insertError || insertAlarmError ? false : true,
        insertError,
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
          updated_at: dayjs(),
          is_del: true,
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
