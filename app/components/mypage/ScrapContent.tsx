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

const ScrapIconP = styled.p`
  font-size: 35px;
  margin-right: 12px;
`;

const postList: Array<Post> = [
  {
    id: 1,
    date: dayjs(),
    title: '안녕하세요. 궁금한게 있습니다.',
    content: '본문 내용입니다.',
    nickname: 'ohdal',
    modified: false,
    solved: false,
  },
  {
    id: 2,
    date: dayjs(),
    title:
      '안녕하세요. 75자 테스트를 해볼게요. 얼마나 적어야 75자가 넘을까요? 아메리카노 거의 다 마셔가네요. 배가 고프네요. 아직도 75자가 안넘네요?',
    content: '본문 내용입니다.',
    nickname: 'ohdal',
    modified: true,
    solved: false,
  },
  {
    id: 3,
    date: dayjs(),
    title: '이것은 해결된 질문입니다 :)',
    content: '본문 내용입니다.',
    nickname: 'ohdal',
    modified: false,
    solved: true,
  },
  {
    id: 4,
    date: dayjs(),
    title: '해결도되고 수정도 된 질문입니다.',
    content: '본문 내용입니다.',
    nickname: 'ohdal',
    modified: true,
    solved: true,
  },
];

const fetchScrap = async (): Promise<typeof postList> => {
  // TODO: 스크랩한 글 리스트 불러오는 api 연동 (Infinity Scroll)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(postList);
    }, 2000);
  });
};

const ScrapContent = async () => {
  const list: typeof postList = await fetchScrap();

  return (
    <ContentContainer>
      {list?.map((post, idx) => (
        <PostComp.PostCompRegacy key={`reaction-${idx}`} {...post}>
          <ScrapIconP>📚</ScrapIconP>
        </PostComp.PostCompRegacy>
      ))}
    </ContentContainer>
  );
};

export default ScrapContent;
