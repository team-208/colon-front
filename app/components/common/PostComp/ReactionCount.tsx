'use client';

import { useState, useMemo } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import { ReactionType, ReactionObjType } from './type';

export interface ReactionProps {
  reactionCountObj: ReactionObjType;
  userReaction?: ReactionType | undefined;
}

const CountBoxDiv = styled.div<{ $isSelect: boolean; $isActive: boolean }>`
  display: flex;
  align-items: center;

  width: fit-content;
  height: 32px;
  padding: 4px 8px 4px 6px;
  border-radius: 10px;

  background: ${({ theme, $isSelect, $isActive }) =>
    $isSelect
      ? theme.color.palette.deepSkyBlue99
      : $isActive
        ? theme.color.palette.coolNeutral97
        : 'none'};
`;

const CountSpan = styled.span`
  display: inline-block;
  margin-left: 4px;
`;

const ReactionCount = ({ reactionCountObj, userReaction }: ReactionProps) => {
  const [isActive, setIsActive] = useState(false);

  const emojiCount = useMemo(() => {
    const list = [];
    let sum = 0;
    for (const [key, value] of Object.entries(reactionCountObj)) {
      list.push({ key, value });
      sum += value;
    }
    return { list, sum };
  }, []);

  return (
    <CountBoxDiv
      $isSelect={!!userReaction}
      $isActive={isActive}
      onClick={() => setIsActive((v) => !v)}
    >
      {emojiCount.sum > 0 ? (
        <>
          {emojiCount.list.map((v) => (
            <Image
              key={`emoji-${v.key}`}
              alt="이모지"
              src={`${IMAGE_CDN}/qna/Emoji${v.key}.png`}
              width={20}
              height={20}
            />
          ))}
        </>
      ) : (
        <Image alt="이모지" src={`${IMAGE_CDN}/qna/EmojiAdd.png`} width={24} height={24} />
      )}
      <CountSpan>{emojiCount.sum}</CountSpan>
    </CountBoxDiv>
  );
};
export default ReactionCount;
export type ReactionCountType = { ReactionCount: typeof ReactionCount };
