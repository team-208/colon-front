'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { IMAGE_CDN } from '@/app/constants/externalUrls';

interface Props {
  className?: string;
  postId: number;
  emojiCount: number;
  commentCount: number;
}

const ContainerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CountBoxDiv = styled.div`
  ${({ theme }) => theme.font.body3};
  display: flex;
  align-items: center;
`;

const CountSpan = styled.span`
  display: inline-block;
  margin-left: 4px;

  & > strong {
    color: ${({ theme }) => theme.color.primary.normal};
  }
`;

const SeperatorSpan = styled.span`
  margin: 0 8px;
  ${({ theme }) => theme.font.caption2};
  font-weight: 400;
`;

const ReactionCount = ({ className, emojiCount, commentCount }: Props) => (
  <ContainerDiv className={className}>
    <CountBoxDiv>
      <Image
        alt="엄지척 이모지"
        src={`${IMAGE_CDN}/qna/EmojiThumbsUp.png`}
        width={16}
        height={16}
      />
      <Image alt="하트 이모지" src={`${IMAGE_CDN}/qna/EmojiHeartEyes.png`} width={16} height={16} />
      <Image alt="웃음 이모지" src={`${IMAGE_CDN}/qna/EmojiLaughing.png`} width={16} height={16} />
      <CountSpan>{emojiCount}</CountSpan>
      <SeperatorSpan>|</SeperatorSpan>
      <CountSpan>
        <strong>CO:</strong> {commentCount}
      </CountSpan>
    </CountBoxDiv>
  </ContainerDiv>
);

export default ReactionCount;
export type ReactionCountType = { ReactionCount: typeof ReactionCount };
