'use client';

import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Post } from '@/app/types/data';
import PostComponent from '../common/PostComp';

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

const ScrapContent = () => {
  const [list, setList] = useState<typeof postList | null>(null);

  useEffect(() => {
    // TODO: 스크랩한 글 리스트 불러오는 api 연동 (Infinity Scroll)
    setTimeout(() => {
      setList(postList);
    }, 2000);
  }, []);

  return (
    <ContentContainer>
      {list ? (
        list.map((post, idx) => (
          <PostComponent key={`reaction-${idx}`} {...post}>
            <ScrapIconP>📚</ScrapIconP>
          </PostComponent>
        ))
      ) : (
        // TODO: 로딩 or 게시물 없음 화면
        <div>Loading...</div>
      )}
    </ContentContainer>
  );
};

export default ScrapContent;
