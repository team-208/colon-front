import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';
import { HISTORY_TYPES } from './type';
import { PostListItem } from '../../post/type';
import { PostScrapListItem } from '../../post/scrap/type';

export async function GET(request: NextRequest, response: Response) {
  const host = getHost();

  const supabase = await createClient();

  const searchParams = request.nextUrl.searchParams;
  const historyType = searchParams.get('historyType') as HISTORY_TYPES;

  try {
    const { data, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      return NextResponse.json({ success: false, sessionError });
    }

    const userId = data.session?.user.id;

    const postQuery = supabase.from('posts').select('*');
    const commentQuery = supabase
      .from('comments')
      .select(
        '*, posts!comments_post_id_fkey ( id, status, title, preview_body, author_major, requested_major, author_nickname )',
      )
      .eq('user_id', userId);

    // 활동내역 list
    if (historyType === 'ACTIVITY') {
      const { data: postHistory, error: postGetError } = await postQuery.eq('user_id', userId);

      if (postGetError) {
        return NextResponse.json({ success: false, postGetError });
      }

      const postHistoryList = postHistory.map((post: PostListItem) => {
        const {
          id,
          status,
          requested_major,
          author_major,
          author_nickname,
          title,
          preview_body,
          updated_at,
        } = post;
        return {
          type: 'POST',
          post: {
            postId: id,
            postStatus: status,
            postAuthorMajor: author_major,
            postRequestedMajor: requested_major,
            authorNickname: author_nickname,
            title,
            previewBody: preview_body,
          },
          updatedAt: updated_at,
        };
      });

      const { data: commentHistory, error: commentGetError } = await commentQuery;

      if (commentGetError) {
        return NextResponse.json({ success: false, commentGetError });
      }

      const commentHistoryList = commentHistory.map((commentItem) => {
        const { id, author_major, author_nickname, comment, updated_at, posts } = commentItem;
        const {
          id: postId,
          status: postStatus,
          title,
          preview_body,
          author_major: postAuthorMajor,
          requested_major: postRequestedMajor,
          author_nickname: authorNickname,
        } = posts;

        return {
          type: 'COMMENT',
          post: {
            postId,
            postStatus,
            postAuthorMajor,
            postRequestedMajor,
            authorNickname,
            title,
            previewBody: preview_body,
          },
          comment: {
            commentId: id,
            commentAuthorMajor: author_major,
            commentAuthorNickname: author_nickname,
            comment,
          },
          updatedAt: updated_at,
        };
      });

      const res = [...postHistoryList, ...commentHistoryList];
      res.sort((prev, next) => (prev.updatedAt < next.updatedAt ? 1 : -1));

      return NextResponse.json({
        success: true,
        list: res,
      });
    }

    if (historyType === 'SCRAP') {
      const { data: scrapList, error: scrapGetError } = await supabase
        .from('scraps')
        .select('id, post_id, created_at')
        .eq('user_id', userId);

      if (scrapGetError) {
        return NextResponse.json({ success: false, scrapGetError });
      }

      const { data: postHistory, error: postGetError } = await postQuery
        .order('id', { ascending: false })
        .in(
          'id',
          scrapList.map((v) => v.post_id),
        );

      if (postGetError) {
        return NextResponse.json({ success: false, postGetError });
      }

      const srapHistoryList = postHistory.map((post: PostListItem) => {
        return {
          type: 'POST',
          post: {
            postId: post.id,
            postStatus: post.status,
            postAuthorMajor: post.author_major,
            postRequestedMajor: post.requested_major,
            authorNickname: post.author_nickname,
            title: post.title,
            previewBody: post.preview_body,
          },
          updatedAt: post.updated_at,
        };
      });

      return NextResponse.json({
        success: true,
        list: srapHistoryList,
      });
    }

    if (historyType === 'REACTIONS') {
      return NextResponse.json({
        success: true,
        list: [],
      });
    }

    return NextResponse.json({ success: true, list: [] });
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}

export async function POST(request: Request) {
  const host = getHost();

  const supabase = await createClient();
  const bodyData = await request.json();

  try {
    const { error } = await supabase.from('user_info').insert([{ ...bodyData }]);
    // TODO: error 처리 프론트 or 백 결정 필요.
    return NextResponse.json({ success: error ? false : true });
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}

export async function PUT(request: Request) {
  const host = getHost();

  const supabase = await createClient();
  const bodyData = await request.json();

  try {
    const { data } = await supabase.auth.getSession();
    const { error } = await supabase
      .from('user_info')
      .update({ ...bodyData })
      .eq('user_id', data.session?.user.id);
    // TODO: error 처리 프론트 or 백 결정 필요.
    return NextResponse.json({ success: error ? false : true, error });
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
