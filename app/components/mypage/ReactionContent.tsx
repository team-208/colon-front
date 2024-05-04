'use client';

import dayjs from 'dayjs';
import styled from 'styled-components';
import { Post } from '@/app/types/data';
import PostComp from '../common/PostComp';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: 32px;
  }
`;

const ReactionP = styled.p`
  font-size: 35px;
  margin-right: 12px;
`;

interface ReactionPost extends Post {
  reaction: string;
}

const time = dayjs();
const postList: Array<ReactionPost> = [
  {
    id: 1,
    reaction: '🥹',
    date: dayjs(),
    title: '안녕하세요. 궁금한게 있습니다.',
    content: '본문 내용입니다.',
    nickname: 'ohdal',
    modified: false,
    solved: false,
  },
  {
    id: 2,
    reaction: '🧡',
    date: time.subtract(4, 'minute'),
    title:
      '안녕하세요. 75자 테스트를 해볼게요. 얼마나 적어야 75자가 넘을까요? 아메리카노 거의 다 마셔가네요. 배가 고프네요. 아직도 75자가 안넘네요?',
    content: '본문 내용입니다.',
    nickname: 'ohdal',
    modified: true,
    solved: false,
  },
  {
    id: 3,
    reaction: '😡',
    date: time.subtract(23, 'hour'),
    title: '이것은 해결된 질문입니다 :)',
    content: '본문 내용입니다.',
    nickname: 'ohdal',
    modified: false,
    solved: true,
  },
  {
    id: 4,
    reaction: '💚',
    date: time.subtract(2, 'day'),
    title: '해결도되고 수정도 된 질문입니다.',
    content: '본문 내용입니다.',
    nickname: 'ohdal',
    modified: true,
    solved: true,
  },
  {
    id: 5,
    reaction: '🤣',
    date: time.subtract(9, 'day'),
    title: '해결도되고 수정도 된 질문입니다.',
    content: '본문 내용입니다.',
    nickname: 'ohdal',
    modified: true,
    solved: true,
  },
];

const fetchReaction = async (): Promise<typeof postList> => {
  // TODO: 반응한 글 리스트 불러오는 api 연동 (Infinity Scroll)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(postList);
    }, 2000);
  });
};

const ReactionContent = async () => {
  const list: typeof postList = await fetchReaction();

  return (
    <ContentContainer>
      {list?.map((post, idx) => (
        <PostComp.PostCompRegacy key={`reaction-${idx}`} {...post}>
          <ReactionP>{post.reaction}</ReactionP>
        </PostComp.PostCompRegacy>
      ))}
    </ContentContainer>
  );
};

export default ReactionContent;
