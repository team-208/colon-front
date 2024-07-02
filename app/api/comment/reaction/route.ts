import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { getHost } from '@/app/utils/host';
import { UpdateCommentReactionRequest, UserReactionsObjType } from './type';
import { isEmpty } from 'lodash';

export async function PUT(request: Request) {
  const host = getHost();

  const supabase = await createClient();
  const bodyData = (await request.json()) as UpdateCommentReactionRequest;

  try {
    const { data: userSession } = await supabase.auth.getSession();

    if (userSession) {
      const { session } = userSession;
      const userId = session?.user.id;

      // Todo user reactions 추가 필요.
      const { data: userReactionsData, error: getUserReaction } = await supabase
        .from('user_reactions')
        .select('*')
        .eq('user_id', userId);

      if (getUserReaction) {
        return NextResponse.json({ success: false, getUserReaction });
      }

      // 모든 게시글 중에 처음으로 게시글 / 댓글에 반응한 유저.
      if (isEmpty(userReactionsData)) {
        const newUserReactions: UserReactionsObjType = {
          posts: [],
          comments: [bodyData.commentId],
        };
        const { error: insertError } = await supabase.from('user_reactions').insert([
          {
            reactions: newUserReactions,
            user_id: userId,
          },
        ]);

        if (insertError) {
          return NextResponse.json({ success: false, insertError });
        }

        const { error: updateError } = await supabase
          .from('comments')
          .update({ reaction_count: bodyData.curReactionCount + 1 })
          .eq('id', bodyData.commentId);

        return NextResponse.json({ success: updateError ? false : true, updateError });
      }

      // 한번 이라도 다른 게시글 / 댓글에 반응 한 적이 있는 유저
      const userReaction = userReactionsData[0].reactions as UserReactionsObjType;
      const isAddReaction = !userReaction.comments.includes(bodyData.commentId);

      const { error: updateUserReactionError } = await supabase
        .from('user_reactions')
        .update({
          reactions: {
            ...userReaction,
            comments: isAddReaction
              ? [...userReaction.comments]
              : userReaction.comments.filter((item) => item !== bodyData.commentId),
          },
        })
        .eq('user_id', userId);
      if (updateUserReactionError) {
        return NextResponse.json({ success: false, updateUserReactionError });
      }
      const { error: updateError } = await supabase
        .from('comments')
        .update({
          reaction_count: isAddReaction
            ? bodyData.curReactionCount + 1
            : bodyData.curReactionCount - 1,
        })
        .eq('id', bodyData.commentId);
      return NextResponse.json({ success: updateError ? false : true, updateError });
    }

    return NextResponse.redirect(`${host}/error/500`);
  } catch (error) {
    return NextResponse.redirect(`${host}/error/500`);
  }
}
