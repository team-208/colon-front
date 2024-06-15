'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import { useCallback } from 'react';
import { useInsertPostScrapMutation } from '@/app/api/post/scrap/mutations';
import { useQueryClient } from '@tanstack/react-query';
import QUERY_KEYS from '@/app/api/queryKeys';
import usePostScrapQuery from '@/app/api/post/scrap/queries';
import usePostQuery from '@/app/api/post/[id]/queries';

interface Props {
  className?: string;
  postId: number;
  emojiCount: number;
  commentCount: number;
  isScrap?: boolean;
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

const ReactionCount = ({ className, postId, emojiCount, commentCount, isScrap }: Props) => {
  const { refetch } = usePostScrapQuery();
  const { mutateAsync } = useInsertPostScrapMutation();

  const handleClickScrap = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isScrap === undefined) {
      return;
    }

    e.preventDefault();
    const res = await mutateAsync({ postId });
    if (res.success) {
      refetch();
    }
  }, []);

  return (
    <ContainerDiv className={className}>
      <CountBoxDiv>
        <Image
          alt="엄지척 이모지"
          src={`${IMAGE_CDN}/qna/EmojiThumbsUp.png`}
          width={16}
          height={16}
        />
        <Image
          alt="하트 이모지"
          src={`${IMAGE_CDN}/qna/EmojiHeartEyes.png`}
          width={16}
          height={16}
        />
        <Image
          alt="웃음 이모지"
          src={`${IMAGE_CDN}/qna/EmojiLaughing.png`}
          width={16}
          height={16}
        />
        <CountSpan>{emojiCount}</CountSpan>
        <SeperatorSpan>|</SeperatorSpan>
        <CountSpan>
          <strong>CO:</strong> {commentCount}
        </CountSpan>
      </CountBoxDiv>

      <button onClick={handleClickScrap}>
        <Image
          alt="스크랩 아이콘"
          src={
            isScrap
              ? `${IMAGE_CDN}/icon/bookmark-fill.svg`
              : `${IMAGE_CDN}/icon/bookmark-stroke.svg`
          }
          width={24}
          height={24}
        />
      </button>
    </ContainerDiv>
  );
};

export default ReactionCount;
export type ReactionCountType = { ReactionCount: typeof ReactionCount };
