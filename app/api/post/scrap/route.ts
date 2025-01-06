import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';
import { InsertPostScrapRequest } from './type';
import { isEmpty } from 'lodash';
import { ALARM_CONTENT_TYPES } from '../../alarm/constant';

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
        .select('user_id, title, scrap_count')
        .eq('id', postId)
        .single();

      if (getPostError) {
        return NextResponse.json({ success: false, getPostError });
      }

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

      const scrapCount = postData.scrap_count + 1;
      const { error: updatePostError } = await supabase
        .from('posts')
        .update({ scrap_count: scrapCount })
        .eq('id', postId);

      if (updatePostError) {
        return NextResponse.json({ success: false, updatePostError });
      }

      if (scrapCount % 5 === 0) {
        // scrap 이 5의 배수로 추가 될때 알림 진행.
        const { error: insertAlarmError } = await supabase.from('alarm').insert({
          user_id: postData.user_id,
          content_type: ALARM_CONTENT_TYPES.POST_SCRAP,
          content_id: postId,
          content_title: postData.title,
          message: `스크랩 수가 ${scrapCount}개를 달성했어요!`,
        });

        if (insertAlarmError) {
          return NextResponse.json({ success: false, insertError });
        }
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.redirect(`${host}/error/500`);
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
