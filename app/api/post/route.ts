import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';
import dayjs from 'dayjs';
import { InsertPostRequest, PostListOrderTypes } from './type';
import { PAGE_OFFSET_VALUE, POST_STATUS } from './constants';
import { JOB_GROUP_TYPES } from '../auth/user/type';
import { reactionsDefault } from '@/app/constants/reactions';

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
      let comment;
      if (item.comments_count > 0) {
        const { data: commnetData, error: commentGetError } = await supabase
          .from('comments')
          .select('*')
          .eq('post_id', item.id)
          .neq('is_del', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
          
        comment = commnetData;

        if (commentGetError) {
          return NextResponse.json({
            success: false,
            offset,
            totalCount: 0,
            count: 0,
            list: [],
            ...commentGetError,
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
