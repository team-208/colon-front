import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';
import { InsertPostScrapRequest } from './type';
import { isEmpty } from 'lodash';

export async function GET(request: Request) {
  const host = getHost();

  const supabase = await createClient();

  try {
    const { data: userSession } = await supabase.auth.getSession();

    if (userSession) {
      const { session } = userSession;
      const userId = session?.user.id;
      const { data, error: scrapGetError } = await supabase
        .from('scraps')
        .select('id, post_id, created_at')
        .eq('user_id', userId);

      if (scrapGetError) {
        return NextResponse.json({
          success: false,
          list: [],
          ...scrapGetError,
        });
      }

      return NextResponse.json({
        success: true,
        list: [...data],
      });
    }

    return NextResponse.json({
      success: true,
      list: [],
    });
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}

export async function POST(request: Request) {
  const host = getHost();

  const supabase = await createClient();
  const bodyData = (await request.json()) as InsertPostScrapRequest;

  try {
    const { data: userSession } = await supabase.auth.getSession();

    if (userSession) {
      const { session } = userSession;
      const userId = session?.user.id;

      const { postId } = bodyData;

      const { data: scrapData, error: getScrapsError } = await supabase
        .from('scraps')
        .select('*')
        .eq('user_id', userId)
        .eq('post_id', postId);

      if (getScrapsError) {
        return NextResponse.json({ success: false, getScrapsError });
      }

      const { data: postData, error: getPostError } = await supabase
        .from('posts')
        .select('scrap_count')
        .eq('id', postId)
        .single();

      if (getPostError) {
        return NextResponse.json({ success: false, getPostError });
      }
      console.log(postData);

      if (!isEmpty(scrapData)) {
        const { error: deleteError } = await supabase
          .from('scraps')
          .delete()
          .eq('user_id', userId)
          .eq('post_id', postId);

        if (deleteError) {
          return NextResponse.json({ success: false, deleteError });
        }

        const { error: updatePostError } = await supabase
          .from('posts')
          .update({ scrap_count: postData.scrap_count - 1 })
          .eq('id', postId);

        if (updatePostError) {
          return NextResponse.json({ success: false, updatePostError });
        }

        return NextResponse.json({ success: true });
      }

      const { error: insertError } = await supabase.from('scraps').insert({
        user_id: userId,
        post_id: postId,
      });

      if (insertError) {
        return NextResponse.json({ success: false, insertError });
      }

      const { error: updatePostError } = await supabase
        .from('posts')
        .update({ scrap_count: postData.scrap_count + 1 })
        .eq('id', postId);

      if (updatePostError) {
        return NextResponse.json({ success: false, updatePostError });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.redirect(`${host}/error/500`);
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
