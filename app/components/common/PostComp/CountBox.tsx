'use client';

import styled from 'styled-components';
import ReactionCount from './ReactionCount';
import CommentCount from './CommentCount';

interface Props {
  className?: string;
  postId: number;
  emojiCount: number;
  commentCount: number;
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

const CountBox = ({ className, emojiCount, commentCount }: Props) => {
  return (
    <ContainerDiv className={className}>
      <ReactionCount count={emojiCount} />
      <SeperatorSpan>|</SeperatorSpan>
      <CommentCount count={commentCount} />
    </ContainerDiv>
  );
};

export default CountBox;
export type CountBoxType = { CountBox: typeof CountBox };
