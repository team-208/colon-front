'use client';

import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import { useModifyPostMutation } from '@/app/api/post/[id]/mutations';
import ButtonComp from '@/app/components/common/ButtomComp';
import CommentComp from '@/app/components/common/CommentComp';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import styled from 'styled-components';

interface Props {
  postId: string;
  commentId: number;
  isNestedComment: boolean;
  authorMajor: JOB_GROUP_TYPES;
  authorNickName: string;
  updatedAt: string;
  isSelected: boolean;
  comment: string;
  isVisibleChoice: boolean;
}

const CommentP = styled.p`
  ${({ theme }) => theme.font.body2};
  font-weight: 400;
  color: ${({ theme }) => theme.color.label.normal};
  margin: 6px 0 10px;
`;

const FooterBoxDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChoiceButton = styled(ButtonComp.Solid)`
  padding: 4px 10px;
  height: 26px;
  border-radius: 8px;
`;

// TODO: 수정필요.
const emojis = {
  thumbsUp: 2,
  smilingHeart: 4,
  heart: 0,
};

const CommentItem = ({
  postId,
  commentId,
  isNestedComment,
  authorMajor,
  authorNickName,
  updatedAt,
  isSelected,
  comment,
  isVisibleChoice,
}: Props) => {
  const { mutateAsync } = useModifyPostMutation();

  const { refresh } = useRouter();

  const handleClickChoice = useCallback(async () => {
    await mutateAsync({ id: parseInt(postId), status: 'COMPLETE', accept_comment_id: commentId });
    refresh();
  }, []);

  return (
    <CommentComp.Wrapper isNestedComment={isNestedComment}>
      <CommentComp.Header
        major={authorMajor}
        nickname={authorNickName}
        updatedAt={updatedAt}
        isSelected={isSelected}
        onClickModify={() => {}}
        onClickDelete={() => {}}
      />
      <CommentP>{comment}</CommentP>
      <FooterBoxDiv>
        <CommentComp.Emojis emojis={emojis} />
        {isVisibleChoice && (
          <ChoiceButton isActive onClick={handleClickChoice}>
            글쓴이 채택
          </ChoiceButton>
        )}
      </FooterBoxDiv>
    </CommentComp.Wrapper>
  );
};

export default CommentItem;
