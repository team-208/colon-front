import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';
import { isEmpty } from 'lodash';

function listParser(originArr: any, list: any) {
  const res = [...originArr];

  if (!list?.length) {
    return res;
  }

  let index = 0;
  while (index < list.length) {
    if (!list[index]) {
      break;
    }

    if (!res.find((post) => post.id === list[index].id)) {
      res.push({ ...list[index] });
    }
    index++;
  }

  return res;
}

export async function GET(request: NextRequest) {
  const host = getHost();
  const searchParams = request.nextUrl.searchParams;
  const word = searchParams.get('word') as string;

  const supabase = await createClient();
  try {
    // 1 순위: 답변이 채택된 글
    const { data: completePostData, error: completePostGetError } = await supabase
      .from('posts')
      .select(
        'id, status, requested_major, title, body, preview_body, tags, created_at, updated_at, author_nickname, author_major, author_profile_url, reactions, comments_count, accept_comment_id',
      )
      .ilike('title', `%${word}%`)
      .not('accept_comment_id', 'is', null)
      .order('id', { ascending: false });

    if (completePostGetError) {
      return NextResponse.json({
        success: false,
        ...completePostGetError,
      });
    }

    let postList = isEmpty(completePostData) ? [] : completePostData;

    // 2 순위: 반응순. 반응 작업 후 적용 필요.

    const { data: reactionPostsData, error: reactionPostsGetError } = await supabase
      .from('posts')
      .select(
        'id, status, requested_major, title, body, preview_body, tags, created_at, updated_at, author_nickname, author_major, author_profile_url, reactions, comments_count, accept_comment_id',
      )
      .not('reaction_count', 'eq', 0)
      .ilike('title', `%${word}%`)
      .order('reaction_count', { ascending: false })
      .order('id', { ascending: false });

    if (reactionPostsGetError) {
      return NextResponse.json({
        success: false,
        ...reactionPostsGetError,
      });
    }

    postList = [...listParser(postList, reactionPostsData)];

    // 3 순위: 댓글순. 댓글 갯수 컬럼 추가 필요.

    const { data: commentsPostsData, error: commentsPostsGetError } = await supabase
      .from('posts')
      .select(
        'id, status, requested_major, title, body, preview_body, tags, created_at, updated_at, author_nickname, author_major, author_profile_url, reactions, comments_count, accept_comment_id',
      )
      .not('comments_count', 'eq', 0)
      .ilike('title', `%${word}%`)
      .order('comments_count', { ascending: false })
      .order('id', { ascending: false });

    if (commentsPostsGetError) {
      return NextResponse.json({
        success: false,
        ...commentsPostsGetError,
      });
    }

    postList = [...listParser(postList, commentsPostsData)];

    const { data: allPostsData, error: allPostsGetError } = await supabase
      .from('posts')
      .select(
        'id, status, requested_major, title, body, preview_body, tags, created_at, updated_at, author_nickname, author_major, author_profile_url, reactions, comments_count, accept_comment_id',
      )
      .ilike('title', `%${word}%`)
      .order('id', { ascending: false });

    if (allPostsGetError) {
      return NextResponse.json({
        success: false,
        ...allPostsGetError,
      });
    }

    postList = [...listParser(postList, allPostsData)];

    return NextResponse.json({
      success: true,
      posts: postList,
      comments: [],
    });
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
