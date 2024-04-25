import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';
import dayjs from 'dayjs';
import { InsertPostRequest } from './type';

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
