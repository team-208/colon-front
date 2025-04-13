import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';
import dayjs from 'dayjs';
import { InsertPostRequest, PostListOrderTypes } from './type';
import { PAGE_OFFSET_VALUE, POST_STATUS } from './constants';
import { JOB_GROUP_TYPES } from '../auth/user/type';
import { reactionsDefault } from '@/app/constants/reactions';
import { resolve } from 'path';

const ORDER_OPTIONS = {
  DATE_DESC: { column: 'created_at', sort: { ascending: false } },
  REACTION_DESC: { column: 'reaction_count', sort: { ascending: false } },
  COMMENT_DESC: { column: 'comments_count', sort: { ascending: false } },
  SCRAP_DESC: { column: 'scrap_count', sort: { ascending: false } },
};

export async function POST(request: Request) {
  const host = getHost();

  const supabase = await createClient();
  const bodyData = (await request.json()) as InsertPostRequest;

  try {
    const { data: userSession } = await supabase.auth.getSession();

    if (userSession) {
      const { session } = userSession;
      const userId = session?.user.id;

      const createdDate = dayjs();

      const { data: postData, error: postError } = await supabase.storage
        .from('posts')
        .upload(`${createdDate.format('YYYYMMDDHHmmss')}_${userId}.txt`, bodyData.body, {
          upsert: true,
        });
      if (postError) {
        return NextResponse.json({ success: false, postError });
      }

      const {
        status,
        requested_major,
        title,
        preview_body,
        tags,
        author_major,
        author_profile_url,
        author_nickname,
      } = bodyData;

      const { error: insertError } = await supabase.from('posts').insert([
        {
          status,
          requested_major,
          title,
          preview_body,
          tags,
          author_major,
          author_profile_url: author_profile_url ?? '',
          author_nickname,
          body_url: postData?.path,
          created_at: createdDate,
          updated_at: dayjs(),
        },
      ]);

      const { data, error: getPostError } = await supabase
        .from('posts')
        .select('id')
        .eq('body_url', postData?.path)
        .single();

      if (insertError || getPostError) {
        return NextResponse.json({ success: false, insertError, getPostError });
      }

      return NextResponse.json({ success: true, postId: data.id });
    }

    return NextResponse.redirect(`${host}/error/500`);
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}

export async function GET(request: NextRequest) {
  const host = getHost();

  const supabase = await createClient();

  const searchParams = request.nextUrl.searchParams;
  const order = searchParams.get('order') as PostListOrderTypes;
  const major = searchParams.get('major') as JOB_GROUP_TYPES;
  const offset = parseInt(searchParams.get('offset') as string);

  try {
    const orderOption = ORDER_OPTIONS[order] ?? ORDER_OPTIONS.DATE_DESC;

    const { error: totalPostGetError, count: totalCount } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .neq('status', POST_STATUS.EDITING)
      .neq('is_del', true)
      .order(orderOption.column, { ...orderOption.sort });

    const postQuery = supabase
      .from('posts')
      .select('*')
      .neq('status', POST_STATUS.EDITING)
      .neq('is_del', true)
      .order(orderOption.column, { ...orderOption.sort });

    if (!!major) {
      postQuery.eq('requested_major', major);
    }

    const { data, error: postGetError } = await postQuery.range(
      offset * PAGE_OFFSET_VALUE,
      (offset + 1) * PAGE_OFFSET_VALUE - 1,
    );

    if (totalPostGetError || postGetError) {
      return NextResponse.json({
        success: false,
        offset,
        totalCount: 0,
        count: 0,
        list: [],
        ...postGetError,
      });
    }

    const list = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      // 댓글 존재
      let comment, commentError;
      if (item.comments_count > 0) {
        const commentQuery = supabase
          .from('comments')
          .select('*')
          .is('original_comment', null)
          .eq('post_id', item.id)
          .neq('is_del', true);

        if (item.accept_comment_id !== null) {
          // 선택 답변
          const { data: acceptComment, error } = await commentQuery
            .eq('id', item.accept_comment_id[0])
            .limit(1)
            .single();

          comment = acceptComment;
          commentError = error;
        } else {
          // 공감순
          const { data: reactComment, error: commentGetError1 } = await commentQuery
            .order('reaction_count', { ascending: false })
            .limit(1)
            .single();

          // 최신순
          const { data: latestComment, error: commentGetError2 } = await commentQuery
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          comment = reactComment || latestComment;
          commentError = commentGetError1 || commentGetError2;
        }

        if (commentError) {
          return NextResponse.json({
            success: false,
            offset,
            totalCount: 0,
            count: 0,
            list: [],
            ...commentError,
          });
        }
      }

      list.push({
        ...item,
        reactions: item.reactions ?? JSON.stringify(reactionsDefault),
        comment: comment ?? null,
      });
    }

    return NextResponse.json({
      success: true,
      offset,
      totalCount,
      count: data.length,
      list,
    });
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
