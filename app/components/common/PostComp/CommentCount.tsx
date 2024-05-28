'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { IMAGE_CDN } from '@/app/constants/externalUrls';

interface Props {
  count: number;
}

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CountP = styled.p`
  ${({ theme }) => theme.font.body2}
  color: ${({ theme }) => theme.color.label.normal};
  margin-left: 6px;
`;

const CommentCount = ({ count }: Props) => {
  return (
    <ContainerDiv>
      <Image alt="댓글 아이콘" src={`${IMAGE_CDN}/qna/Icon_Comment.png`} width={24} height={24} />
      <CountP>{count}</CountP>
    </ContainerDiv>
  );
};

export default CommentCount;
export type CommentCountType = { CommentCount: typeof CommentCount };
