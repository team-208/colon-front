import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';
import dayjs from 'dayjs';
import { InsertPostRequest, PostListOrderTypes } from './type';
import { PAGE_OFFSET_VALUE } from './constants';

export async function POST(request: Request) {
  const host = getHost();

  const supabase = await createClient();
  const bodyData = (await request.json()) as InsertPostRequest;

  try {
    const { data: userSession } = await supabase.auth.getSession();

    if (userSession) {
      const { session } = userSession;
      const userId = session?.user.id;

      const { data: postData, error: postError } = await supabase.storage
        .from('posts')
        .upload(`${dayjs().format('YYYYMMDDHHmmss')}_${userId}.txt`, bodyData.body, {
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
          author_profile_url,
          author_nickname,
          body_url: postData?.path,
          created_at: dayjs(),
          updated_at: dayjs(),
        },
      ]);

      return NextResponse.json({ success: insertError ? false : true, insertError });
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
  const offset = parseInt(searchParams.get('offset') as string);

  try {
    // TODO: 정렬 작업 필요.
    const orderOption =
      order === 'DATE_DESC'
        ? { column: 'created_at', sort: { ascending: false } }
        : { column: 'created_at', sort: { ascending: false } };

    const { error: totalPostGetError, count: totalCount } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .order(orderOption.column, { ...orderOption.sort });

    const { data, error: postGetError } = await supabase
      .from('posts')
      .select('*')
      .order(orderOption.column, { ...orderOption.sort })
      .range(offset * PAGE_OFFSET_VALUE, (offset + 1) * PAGE_OFFSET_VALUE);

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

    return NextResponse.json({
      success: true,
      offset,
      totalCount,
      count: data.length,
      list: [...data],
    });
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
