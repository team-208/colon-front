'use client';

import { IMAGE_CDN } from '@/app/constants/externalUrls';
import Image from 'next/image';
import styled from 'styled-components';
interface Props {
  likeCount: number;
  nestedCommentCount?: number;
  onClickLike: () => void;
  onClickNestedComment?: () => void;
}

const EmojiListUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: -4px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 8px;
  margin: 4px;

  span {
    display: inline-block;
    ${({ theme }) => theme.font.body3};
    margin-left: 6px;
  }
`;

const Reactions = ({ likeCount, nestedCommentCount, onClickLike, onClickNestedComment }: Props) => {
  return (
    <EmojiListUl>
      <li>
        <IconButton type="button" onClick={onClickLike}>
          <Image
            alt="엄지척 이모지"
            src={`${IMAGE_CDN}/icon/Icon_Like_Gray.svg`}
            width={20}
            height={20}
          />
          <span>{likeCount}</span>
        </IconButton>
      </li>
      {nestedCommentCount !== undefined && (
        <li>
          <IconButton type="button" onClick={onClickNestedComment}>
            <Image
              alt="댓글 아이콘"
              src={`${IMAGE_CDN}/qna/Icon_Comment.png`}
              width={20}
              height={20}
            />
            <span>{nestedCommentCount}</span>
          </IconButton>
        </li>
      )}
    </EmojiListUl>
  );
};

export default Reactions;
export type ReactionsType = { Reactions: typeof Reactions };
