'use client';

import dayjs from 'dayjs';
import styled from 'styled-components';
import { UserPost, UserComment } from '../type';
import ActivityContentInner from './ActivityContentInner';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: 32px;
  }
`;

const commentList: Array<UserComment> = [
  {
    id: 1,
    date: dayjs(),
    postInfo: { id: 1, date: dayjs(), title: '안녕하세요. 궁금한게 있습니다.' },
    comment: '네 제가 답해드리겠습니다 ~',
    type: 'comment',
  },
];

const postList: Array<UserPost> = [
  {
    id: 1,
    reaction: '🥹',
    date: dayjs(),
    title: '안녕하세요. 궁금한게 있습니다.',
    content: '본문 내용입니다.',
    nickname: 'ohdal',
    modified: false,
    solved: false,
    // 해당 api type 반드시 필요 !
    type: 'post',
  },
];

const fetchComment = async (): Promise<typeof commentList> => {
  // TODO: 활동내역 댓글 리스트 불러오는 api 연동 (Infinity Scroll)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(commentList);
    }, 1000);
  });
};

const fetchPost = async (): Promise<typeof postList> => {
  // TODO: 활동내역 글 리스트 불러오는 api 연동 (Infinity Scroll)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(postList);
    }, 1000);
  });
};

const ActivityContent = async () => {
  const list: Array<UserComment | UserPost> = [...(await fetchComment()), ...(await fetchPost())];  

  return (
    <ContentContainer>
      <ActivityContentInner list={list}/>
    </ContentContainer>
  );
};

export default ActivityContent;
