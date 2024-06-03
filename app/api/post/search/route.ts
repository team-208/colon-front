import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';
import { isEmpty } from 'lodash';

const MAX_COUNT = 5;
function listParser(originArr: any, list: any) {
  const res = [...originArr];

  if (!list?.length) {
    return res;
  }

  let index = 0;
  while (res.length < MAX_COUNT && index < list.length) {
    if (!list[index]) {
      break;
    }

    if (!res.find((post) => post.id === list[index].id)) {
      res.push({ id: list[index].id, text: list[index].title });
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
      .select('id, title')
      .ilike('title', `%${word}%`)
      .not('accept_comment_id', 'is', null)
      .order('id', { ascending: false })
      .limit(MAX_COUNT);

    if (completePostGetError) {
      return NextResponse.json({
        success: false,
        ...completePostGetError,
      });
    }

    let postList = isEmpty(completePostData)
      ? []
      : completePostData?.map((post) => ({ id: post.id, text: post.title }));

    // 2 순위: 반응순. 반응 작업 후 적용 필요.
    if (postList.length < MAX_COUNT) {
      const { data: reactionPostsData, error: reactionPostsGetError } = await supabase
        .from('posts')
        .select('id, title')
        .not('reaction_count', 'eq', 0)
        .ilike('title', `%${word}%`)
        .order('reaction_count', { ascending: false })
        .order('id', { ascending: false })
        .limit(MAX_COUNT);

      if (reactionPostsGetError) {
        return NextResponse.json({
          success: false,
          ...reactionPostsGetError,
        });
      }

      postList = [...listParser(postList, reactionPostsData)];
    }

    // 3 순위: 댓글순. 댓글 갯수 컬럼 추가 필요.
    if (postList.length < MAX_COUNT) {
      const { data: commentsPostsData, error: commentsPostsGetError } = await supabase
        .from('posts')
        .select('id, title')
        .not('comments_count', 'eq', 0)
        .ilike('title', `%${word}%`)
        .order('comments_count', { ascending: false })
        .order('id', { ascending: false })
        .limit(MAX_COUNT);

      if (commentsPostsGetError) {
        return NextResponse.json({
          success: false,
          ...commentsPostsGetError,
        });
      }

      postList = [...listParser(postList, commentsPostsData)];
    }

    if (postList.length < MAX_COUNT) {
      const { data: allPostsData, error: allPostsGetError } = await supabase
        .from('posts')
        .select('id, title')
        .ilike('title', `%${word}%`)
        .order('id', { ascending: false })
        .limit(MAX_COUNT);

      if (allPostsGetError) {
        return NextResponse.json({
          success: false,
          ...allPostsGetError,
        });
      }

      postList = [...listParser(postList, allPostsData)];
    }

    return NextResponse.json({
      success: true,
      posts: postList,
      comments: [],
    });
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
