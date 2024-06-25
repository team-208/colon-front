'use client';

import { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import { ReactionType, ReactionObjType } from './type';
import { useModifyPostReactionsMutation } from '@/app/api/post/[id]/reactions/mutations';
import { useRouter } from 'next/navigation';

export interface ReactionProps {
  postId: number;
  reactionCountObj: ReactionObjType;
  userReaction?: ReactionType | undefined;
  reactionDisabled?: boolean;
}

const CountBoxDiv = styled.div<{ $isSelect: boolean; $isActive: boolean; $isDisabled: boolean }>`
  cursor: ${({ $isDisabled }) => !$isDisabled && 'pointer'};
  position: relative;
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

  &:hover {
    background: ${({ theme, $isDisabled, $isActive }) =>
      !$isDisabled && !$isActive && theme.color.palette.deepSkyBlue99};
  }
`;

const FloatingBoxDiv = styled.div<{ $isActive: boolean }>`
  visibility: ${({ $isActive }) => ($isActive ? 'visible' : 'hidden')};
  position: absolute;
  left: 0;
  top: -100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  transform: translateY(-18px);

  padding: 4px 0;
  /* Palette/Blue/99 */
  background: rgba(221, 243, 255, 0.8);
  border-radius: 8px;

  &::after {
    content: '';
    position: absolute;
    left: 32px;
    bottom: -20px;
    width: 0;
    height: 0;
    border-top: 10px solid rgba(221, 243, 255, 0.8);
    border-bottom: 10px solid transparent;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
`;

const EmojiBoxDiv = styled.div<{ $isSelect: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 4px 8px;
  background: ${({ theme, $isSelect }) => $isSelect && theme.color.palette.deepSkyBlue90};
  border-radius: 8px;
  transition: background 0.5s;

  &:hover {
    background: ${({ theme }) => theme.color.palette.deepSkyBlue90};
  }

  &:not(:last-of-type) {
    margin-right: 8px;
  }
`;

const CountSpan = styled.span`
  display: inline-block;
  margin-left: 4px;
`;

const ReactionCount = ({
  postId,
  reactionCountObj,
  userReaction,
  reactionDisabled,
}: ReactionProps) => {
  const [isActive, setIsActive] = useState(false);

  const { mutateAsync } = useModifyPostReactionsMutation();

  const { refresh } = useRouter();

  const emojiCount = useMemo(() => {
    if (!reactionCountObj) {
      return { sum: 0 };
    }
    const list = [];
    let sum = 0;
    for (const [key, value] of Object.entries(reactionCountObj)) {
      list.push({ key, value });
      sum += value;
    }
    return { list, sum };
  }, []);

  const handleCountBoxClick = useCallback(() => {
    if (reactionDisabled) return;

    setIsActive((v) => !v);
  }, [reactionDisabled]);

  const handleEmojiClick = useCallback(
    async (emoji: ReactionType) => {
      if (emoji === userReaction) return;

      // TODO: 유저당 1개씩만 반응 하도록 수정 필요.
      const reactions = { ...reactionCountObj };
      reactions[emoji] = !(emoji in reactions) ? 1 : (reactions[emoji] as number) + 1;
      await mutateAsync({ postId, reactions });

      // TODO: tanstack hydrate 적용 필요.
      refresh();
    },
    [userReaction],
  );

  return (
    <CountBoxDiv
      $isDisabled={!!reactionDisabled}
      $isSelect={!!userReaction}
      $isActive={isActive}
      onClick={handleCountBoxClick}
    >
      {emojiCount.sum > 0 ? (
        <>
          {emojiCount?.list?.map(
            (v) =>
              v.value > 0 && (
                <Image
                  key={`emoji-${v.key}`}
                  alt="이모지"
                  src={`${IMAGE_CDN}/qna/Emoji${v.key}.png`}
                  width={20}
                  height={20}
                />
              ),
          )}
          <CountSpan>{emojiCount.sum}</CountSpan>
        </>
      ) : (
        <Image alt="이모지" src={`${IMAGE_CDN}/qna/EmojiAdd.png`} width={24} height={24} />
      )}
      <FloatingBoxDiv $isActive={isActive}>
        {emojiCount?.list?.map((v) => (
          <EmojiBoxDiv
            key={`emoji-box-${v.key}`}
            $isSelect={v.key === userReaction}
            onClick={() => {
              handleEmojiClick(v.key as ReactionType);
            }}
          >
            <Image alt="이모지" src={`${IMAGE_CDN}/qna/Emoji${v.key}.png`} width={20} height={20} />
            {v.value > 0 && <CountSpan>{v.value}</CountSpan>}
          </EmojiBoxDiv>
        ))}
      </FloatingBoxDiv>
    </CountBoxDiv>
  );
};
export default ReactionCount;
export type ReactionCountType = { ReactionCount: typeof ReactionCount };
