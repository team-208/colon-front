'use client';

import Image from 'next/image';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import styled from 'styled-components';

export interface CommentProps {
  commentCount: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    margin-left: 4px;
  }
`;

const CommentCount = ({ commentCount }: CommentProps) => {
  return (
    <Container>
      <Image alt="댓글 아이콘" src={`${IMAGE_CDN}/qna/Icon_Comment.png`} width={24} height={24} />
      <span>{' ' + (commentCount > 999 ? '999+' : commentCount)}</span>
    </Container>
  );
};

export default CommentCount;
export type CommentCountType = { CommentCount: typeof CommentCount };
