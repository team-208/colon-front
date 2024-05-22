'use client';

import { IMAGE_CDN } from '@/app/constants/externalUrls';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import styled from 'styled-components';

// TODO: comment api반영시 type 수정 필요
interface Props {
  emojis: any;
}

const EmojiListUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: -4px;
`;

const EmojiLi = styled.li`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.palette.coolNeutral97};
  margin: 4px;

  & > span {
    ${({ theme }) => theme.font.caption2};
    margin-left: 4px;
  }
`;

// TODO: comment api반영시 type 수정 필요
const EMOJI_SRC: any = {
  thumbsUp: '/qna/EmojiThumbsUp.png',
  smilingHeart: '/qna/EmojiSmilingHeart.png',
};

const Emojis = ({ emojis }: Props) => {
  return (
    <EmojiListUl>
      {['thumbsUp', 'smilingHeart', 'heart'].map((emoji, idx) =>
        emojis && !!emojis[emoji] ? (
          <EmojiLi key={`emoji-${emoji}-${idx}`}>
            <Image
              alt="엄지척 이모지"
              src={`${IMAGE_CDN}${EMOJI_SRC[emoji]}`}
              width={20}
              height={20}
            />
            <span>{emojis[emoji]}</span>
          </EmojiLi>
        ) : undefined,
      )}

      <EmojiLi>
        <button type="button">
          <Image alt="엄지척 이모지" src={`${IMAGE_CDN}/qna/EmojiAdd.png`} width={20} height={20} />
        </button>
      </EmojiLi>
    </EmojiListUl>
  );
};

export default Emojis;
export type EmojisType = { Emojis: typeof Emojis };
