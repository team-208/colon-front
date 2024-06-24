'use client';

import styled from 'styled-components';
import ReactionCount, { ReactionProps } from './ReactionCount';
import CommentCount, { CommentProps } from './CommentCount';

interface Props extends CommentProps, ReactionProps {
  className?: string;
  postId: number;
}

const ContainerDiv = styled.div`
  ${({ theme }) => theme.font.body2};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SeperatorSpan = styled.span`
  margin: 0 8px;
  ${({ theme }) => theme.font.caption2};
  font-weight: 400;
`;

const CountBox = ({ className, reactionCountObj, userReaction, reactionDisabled, commentCount }: Props) => {
  return (
    <ContainerDiv className={className}>
      <ReactionCount
        reactionCountObj={reactionCountObj}
        userReaction={userReaction}
        reactionDisabled={reactionDisabled}
      />
      <SeperatorSpan>|</SeperatorSpan>
      <CommentCount commentCount={commentCount} />
    </ContainerDiv>
  );
};

export default CountBox;
export type CountBoxType = { CountBox: typeof CountBox };
