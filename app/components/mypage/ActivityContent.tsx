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
    comment:
      '개발 공부를 하면서 이런 유용한 정보를 얻을 수 있다니 정말 좋아요! 반응 남기고 갑니다~',
    author_nickname: '사용자 닉네임',
    author_major: 'PLANNING',
    recommend_count: 999,
    comment_count: 999,
    postInfo: {
      status: 'COMPLETE',
      requestedMajor: 'DEVELOP',
      author_major: 'PLANNING',
      title: '글 제목',
    },
    type: 'comment',
  },
];

const postList: Array<UserPost> = [
  {
    status: 'COMPLETE',
    requestedMajor: 'DEVELOP',
    title: '글 제목',
    bodyUrl: '',
    previewBody: `여행은 새로운 경험과 추억을 선사하지만, 올바른 준비가 필수입니다. 이번 블로그 포스트에서는 여행자가 가져가야 할 10가지 필수 아이템을 상세히 소개합니다. 첫째, 편안한 여행을 위한 양질의 여행 가방. 두 번째는 다양한 환경에 대비할 수 있는 다용도 의류. 세 번째 아이템은 여행 중 긴급 상황에 대비한 응급 키트입니다. 네 번째는 휴대용 충전기와 보조 배터리로, 언제 어디서든 기기를 충전할 수 있게 해줍니다. 다섯 번째는 고성능 카...`,
    tages: [],
    createdAt: dayjs(),
    updatedAt: dayjs(),
    author_nickname: '우아한 코끼리',
    author_major: 'PLANNING',
    author_profile_url: '/',
    type: 'post',
  },
  {
    status: 'EDITING',
    requestedMajor: 'DEVELOP',
    title: '작성 중인 글 저장 공간 입니다.',
    bodyUrl: '',
    previewBody: `여행은 새로운 경험과 추억을 선사하지만, 올바른 준비가 필수입니다. 이번 블로그 포스트에서는 여행자가 가져가야 할 10가지 필수 아이템을 상세히 소개합니다. 첫째, 편안한 여행을 위한 양질의 여행 가방. 두 번째는 다양한 환경에 대비할 수 있는 다용도 의류. 세 번째 아이템은 여행 중 긴급 상황에 대비한 응급 키트입니다. 네 번째는 휴대용 충전기와 보조 배터리로, 언제 어디서든 기기를 충전할 수 있게 해줍니다. 다섯 번째는 고성능 카...`,
    tages: [],
    createdAt: dayjs(),
    updatedAt: dayjs(),
    author_nickname: '우아한 코끼리',
    author_major: 'PLANNING',
    author_profile_url: '/',
    type: 'temp_post',
  },
];

const fetchComment = async (): Promise<typeof commentList> => {
  // TODO: 활동내역 댓글 리스트 불러오는 api 연동 (Infinity Scroll)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(commentList);
    }, 500);
  });
};

const fetchPost = async (): Promise<typeof postList> => {
  // TODO: 활동내역 글 리스트 불러오는 api 연동 (Infinity Scroll)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(postList);
    }, 500);
  });
};

const ActivityContent = async () => {
  const list: Array<UserComment | UserPost> = [...(await fetchComment()), ...(await fetchPost())];

  return (
    <ContentContainer>
      <ActivityContentInner list={list} />
    </ContentContainer>
  );
};

export default ActivityContent;
