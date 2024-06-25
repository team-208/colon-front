'use client';

import styled from 'styled-components';
import ReactionCount, { ReactionProps } from './ReactionCount';
import CommentCount, { CommentProps } from './CommentCount';
import Divider from '../DividerComp';

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

const Vertical = styled(Divider.Vertical)`
  margin: 0 8px;
`;

const CountBox = ({
  className,
  reactionCountObj,
  userReaction,
  reactionDisabled,
  commentCount,
  postId,
}: Props) => {
  return (
    <ContainerDiv className={className}>
      <ReactionCount
        postId={postId}
        reactionCountObj={reactionCountObj}
        userReaction={userReaction}
        reactionDisabled={reactionDisabled}
      />
      <Vertical height={18} color="#171719" />
      <CommentCount commentCount={commentCount} />
    </ContainerDiv>
  );
};

export default CountBox;
export type CountBoxType = { CountBox: typeof CountBox };
