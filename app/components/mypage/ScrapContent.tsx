'use client';

import Image from 'next/image';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Post } from '@/app/types/data';
import PostComp from '../common/PostComp';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import { JOB_GROUP_LABELS } from '../common/constants';

const ContentContainer = styled.div`
  > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const PostCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px 10px;
  background: ${({ theme }) => theme.color.static.light};
  border: 1px solid ${({ theme }) => theme.color.palette.coolNeutral97};
  box-shadow: 0px 1px 10px -3px rgba(126, 145, 157, 0.15);
  border-radius: 8px;
`;

const PostCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PostCardContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const PostCardFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

// TODO: PostComp 에서 분리 필요
const MajorP = styled.p`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.font.body3};
  color: ${({ theme }) => theme.color.label.normal};
  background-color: ${({ theme }) => theme.color.palette.coolNeutral97};
  border: 1px solid ${({ theme }) => theme.color.palette.coolNeutral97};
  width: fit-content;
  height: 24px;
  border-radius: 6px;
  overflow: hidden;

  & > span {
    padding: 2px 4px;
  }

  & > span:last-of-type {
    margin-left: 2px;
    display: inline-block;
    border-radius: 5px;
    overflow: hidden;
    color: ${({ theme }) => theme.color.primary.normal};
    background-color: ${({ theme }) => theme.color.static.light};
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.caption2};
    height: 20px;
  }
`;

const NicknameP = styled.p`
  ${({ theme }) => theme.font.caption1}
  color: ${({ theme }) => theme.color.label.normal};
  margin-left: 6px;
`;

const TitleP = styled.p`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.font.body1}
  color: ${({ theme }) => theme.color.label.normal};
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  img {
    margin-right: 8px;
  }
`;

const PreviewBodyP = styled.p`
  ${({ theme }) => theme.font.body2}
  color: #333438;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const ScrapButton = styled.button`
  display: flex;
  justify-items: center;
  align-items: center;
`;

const postList: Array<Post> = [
  {
    status: 'EDITING',
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
        <PostCardContainer key={`reaction-${idx}`}>
          <PostCardHeader>
            <MajorP>
              <span>{JOB_GROUP_LABELS[post.author_major] ?? ''}</span>
              <span>
                {`>`}
                {JOB_GROUP_LABELS[post.requestedMajor] ?? ''}
              </span>
            </MajorP>
            <NicknameP>{post.author_nickname}</NicknameP>
          </PostCardHeader>
          <PostCardContent>
            <TitleP>
              <Image
                alt="답변 체크"
                src={`${IMAGE_CDN}/qna/CheckMarkButton${
                  post.status === 'COMPLETE' ? '_checked' : '_disable'
                }.png`}
                width={20}
                height={20}
              />
              {post.title}
            </TitleP>
            <PreviewBodyP>{post.previewBody}</PreviewBodyP>
          </PostCardContent>
          <PostCardFooter>
            <div>
              <PostComp.ReactionCount emojiCount={999} commentCount={3} />
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
          </PostCardFooter>
        </PostCardContainer>
      ))}
    </ContentContainer>
  );
};

export default ScrapContent;
