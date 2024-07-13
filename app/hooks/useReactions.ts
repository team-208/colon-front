import { useCallback } from 'react';
import { useModifyPostReactionsMutation } from '../api/post/[id]/reactions/mutations';
import { useRouter } from 'next/navigation';
import { ReactionObjType, ReactionType } from '../components/common/PostComp/type';
import { useUserReactionsMutation } from '../api/auth/user/reactions/mutations';
import useUserReactionsQuery from '../api/auth/user/reactions/queries';

const useReactions = () => {
  const { refetch } = useUserReactionsQuery();
  const { mutateAsync: updatePostReactions } = useModifyPostReactionsMutation();
  const { mutateAsync: updateUserReactions } = useUserReactionsMutation();
  const { refresh } = useRouter();

  const updatePostReaction = useCallback(
    async ({
      emoji,
      userReaction,
      reactionCountObj,
      postId,
    }: {
      reactionCountObj: ReactionObjType;
      userReaction?: ReactionType;
      emoji: ReactionType;
      postId: number;
    }) => {
      if (emoji === userReaction) {
        return;
      }

      const reactions = { ...reactionCountObj };

      // 유저가 다른 이모지를 선택하는 경우 기선택된 emoji count-1
      if (userReaction && emoji !== userReaction) {
        reactions[userReaction] = (reactions[userReaction] as number) - 1;
      }

      reactions[emoji] = !(emoji in reactions) ? 1 : (reactions[emoji] as number) + 1;

      await updatePostReactions({ postId, reactions });

      const { data: userReactionsData } = await refetch();
      const userPostReactions =
        userReactionsData?.posts.filter((post) => post.postId !== postId.toString()) ?? [];
      updateUserReactions({
        posts: [...userPostReactions, { postId: postId.toString(), reactions: emoji }],
        comments: userReactionsData?.comments ?? [],
      });

      // TODO: tanstack hydrate 적용 필요. window reload 임시 처리.
      window?.location.reload();
      //   refresh();
    },
    [],
  );

  return { updatePostReaction };
};

export default useReactions;
