'use client';

import Image from 'next/image';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Post } from '@/app/types/data';
import PostComp from '../common/PostComp';
import PostCard from './PostCard';
import { IMAGE_CDN } from '@/app/constants/externalUrls';

const ContentContainer = styled.div`
  padding: 24px 0 20px 0;

  > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const ScrapButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-items: center;
  align-items: center;
`;

const postList: Array<Post> = [
  {
    id: 1,
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
  },
  {
    id: 2,
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
  },
  {
    id: 3,
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
  },
  {
    id: 4,
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
  },
  {
    id: 5,
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
  },
];

const fetchScrap = async (): Promise<typeof postList> => {
  // TODO: 스크랩한 글 리스트 불러오는 api 연동 (Infinity Scroll)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(postList);
    }, 500);
  });
};

const ScrapContent = async () => {
  const list: typeof postList = await fetchScrap();

  const handleScrapClick = () => {
    // TODO: 스크랩 & 스크랩 취소 api 연동
  };

  return (
    <ContentContainer>
      {list?.map((post, idx) => (
        <PostCard key={`reaction-${idx}`} {...post}>
          <>
            <div>
              <PostComp.CountBox
                postId={post.id}
                reactionCountObj={{
                  ThumbsUp: 1,
                  Pushpin: 2,
                  SmilingHeart: 5,
                }}
                userReaction="ThumbsUp"
                commentCount={3}
              />
            </div>

            <div>
              <ScrapButton onClick={handleScrapClick}>
                <Image
                  alt="스크랩 아이콘"
                  src={`${IMAGE_CDN}/icon/ScrapButton_active_blue.png`}
                  width={24}
                  height={24}
                />
              </ScrapButton>
            </div>
          </>
        </PostCard>
      ))}
    </ContentContainer>
  );
};

export default ScrapContent;
