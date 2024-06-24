'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { IMAGE_CDN } from '@/app/constants/externalUrls';

interface Props {
  count: number;
}

const CountBoxDiv = styled.div`
  display: flex;
  align-items: center;
`;

const CountSpan = styled.span`
  display: inline-block;
  margin-left: 4px;
`;

const ReactionCount = ({ count }: Props) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <CountBoxDiv>
      <Image
        alt="엄지척 이모지"
        src={`${IMAGE_CDN}/qna/EmojiThumbsUp.png`}
        width={16}
        height={16}
      />
      <Image alt="하트 이모지" src={`${IMAGE_CDN}/qna/EmojiHeartEyes.png`} width={16} height={16} />
      <Image alt="웃음 이모지" src={`${IMAGE_CDN}/qna/EmojiLaughing.png`} width={16} height={16} />
      <CountSpan>{count}</CountSpan>
    </CountBoxDiv>
  );
};
export default ReactionCount;
export type ReactionCountType = { ReactionCount: typeof ReactionCount };
