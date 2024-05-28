'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { IMAGE_CDN } from '@/app/constants/externalUrls';

interface Props {
  recommendCount: number;
  commentCount: number;
}

const ContainerDiv = styled.div`
  > div {
    display: inline-flex;
    flex-direction: row;
    align-items: center;

    &:first-of-type {
      margin-right: 12px;
    }
  }
`;

const CountSpan = styled.span`
  ${({ theme }) => theme.font.body3}
  color: ${({ theme }) => theme.color.label.normal};
  margin-left: 6px;
`;

const ReactionCount = ({ recommendCount, commentCount }: Props) => {
  return (
    <ContainerDiv>
      <div>
        <Image
          alt="추천 아이콘"
          src={`${IMAGE_CDN}/qna/Icon_Recommend.png`}
          width={20}
          height={20}
        />
        <CountSpan>{recommendCount}</CountSpan>
      </div>
      <div>
        <Image alt="댓글 아이콘" src={`${IMAGE_CDN}/qna/Icon_Comment.png`} width={20} height={20} />
        <CountSpan>{commentCount}</CountSpan>
      </div>
    </ContainerDiv>
  );
};

export default ReactionCount;
export type ReactionCountType = { ReactionCount: typeof ReactionCount };
