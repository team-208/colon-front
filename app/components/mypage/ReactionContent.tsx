'use client';

import Image from 'next/image';
import dayjs from 'dayjs';
import styled from 'styled-components';
import PostCard from './PostCard';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import { HistoryItemProps } from '@/app/api/auth/history/type';
import useHistoryQuery from '@/app/api/auth/history/queries';
import SkeletonComp from '../common/SkeletonComp';

// TODO: reaction, scrap 추후 변경
interface ReactionPost extends HistoryItemProps {
  reaction: string;
  scrap: boolean;
}

const ContentContainer = styled.div`
  padding: 24px 0 20px 0;

  > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DividerDiv = styled.div`
  width: 1px;
  height: 18px;
  background-color: ${({ theme }) => theme.color.label.normal};
  margin: 0 12px;
`;

const ReactionButton = styled.button`
  display: flex;
  justify-items: center;
  align-items: center;
  width: 40px;
  height: 32px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.palette.deepSkyBlue99};
  padding: 4px 8px;
`;

const CommentCountDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CommentCountP = styled.p`
  ${({ theme }) => theme.font.body2}
  color: ${({ theme }) => theme.color.label.normal};
  margin-left: 6px;
`;

const ScarpIcon = styled(Image)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

const time = dayjs();
const postList: Array<ReactionPost> = [
  {
    type: 'POST',
    post: {
      postId: 1,
      postStatus: 'COMPLETE',
      postRequestedMajor: 'DEVELOP',
      title: '글 제목',
      previewBody: `여행은 새로운 경험과 추억을 선사하지만, 올바른 준비가 필수입니다. 이번 블로그 포스트에서는 여행자가 가져가야 할 10가지 필수 아이템을 상세히 소개합니다. 첫째, 편안한 여행을 위한 양질의 여행 가방. 두 번째는 다양한 환경에 대비할 수 있는 다용도 의류. 세 번째 아이템은 여행 중 긴급 상황에 대비한 응급 키트입니다. 네 번째는 휴대용 충전기와 보조 배터리로, 언제 어디서든 기기를 충전할 수 있게 해줍니다. 다섯 번째는 고성능 카...`,
      authorNickname: '우아한 코끼리',
      postAuthorMajor: 'PLANNING',
    },
    scrap: true,
    reaction: '👍🏻',
    updatedAt: time.toString(),
  },
  {
    type: 'POST',
    post: {
      postId: 2,
      postStatus: 'COMPLETE',
      postRequestedMajor: 'DEVELOP',
      title: '글 제목',
      previewBody: `여행은 새로운 경험과 추억을 선사하지만, 올바른 준비가 필수입니다. 이번 블로그 포스트에서는 여행자가 가져가야 할 10가지 필수 아이템을 상세히 소개합니다. 첫째, 편안한 여행을 위한 양질의 여행 가방. 두 번째는 다양한 환경에 대비할 수 있는 다용도 의류. 세 번째 아이템은 여행 중 긴급 상황에 대비한 응급 키트입니다. 네 번째는 휴대용 충전기와 보조 배터리로, 언제 어디서든 기기를 충전할 수 있게 해줍니다. 다섯 번째는 고성능 카...`,
      authorNickname: '우아한 코끼리',
      postAuthorMajor: 'PLANNING',
    },
    reaction: '🥰',
    scrap: true,
    updatedAt: time.subtract(4, 'minute').toString(),
  },
  {
    type: 'POST',
    post: {
      postId: 3,
      postStatus: 'COMPLETE',
      postRequestedMajor: 'DEVELOP',
      title: '글 제목',
      previewBody: `여행은 새로운 경험과 추억을 선사하지만, 올바른 준비가 필수입니다. 이번 블로그 포스트에서는 여행자가 가져가야 할 10가지 필수 아이템을 상세히 소개합니다. 첫째, 편안한 여행을 위한 양질의 여행 가방. 두 번째는 다양한 환경에 대비할 수 있는 다용도 의류. 세 번째 아이템은 여행 중 긴급 상황에 대비한 응급 키트입니다. 네 번째는 휴대용 충전기와 보조 배터리로, 언제 어디서든 기기를 충전할 수 있게 해줍니다. 다섯 번째는 고성능 카...`,
      authorNickname: '우아한 코끼리',
      postAuthorMajor: 'PLANNING',
    },
    reaction: '🥰',
    scrap: true,
    updatedAt: time.subtract(23, 'hour').toString(),
  },
  {
    type: 'POST',
    post: {
      postId: 4,
      postStatus: 'COMPLETE',
      postRequestedMajor: 'DEVELOP',
      title: '글 제목',
      previewBody: `여행은 새로운 경험과 추억을 선사하지만, 올바른 준비가 필수입니다. 이번 블로그 포스트에서는 여행자가 가져가야 할 10가지 필수 아이템을 상세히 소개합니다. 첫째, 편안한 여행을 위한 양질의 여행 가방. 두 번째는 다양한 환경에 대비할 수 있는 다용도 의류. 세 번째 아이템은 여행 중 긴급 상황에 대비한 응급 키트입니다. 네 번째는 휴대용 충전기와 보조 배터리로, 언제 어디서든 기기를 충전할 수 있게 해줍니다. 다섯 번째는 고성능 카...`,
      authorNickname: '우아한 코끼리',
      postAuthorMajor: 'PLANNING',
    },
    reaction: '🥰',
    scrap: true,
    updatedAt: time.subtract(2, 'day').toString(),
  },
  {
    type: 'POST',
    post: {
      postId: 5,
      postStatus: 'COMPLETE',
      postRequestedMajor: 'DEVELOP',
      title: '글 제목',
      previewBody: `여행은 새로운 경험과 추억을 선사하지만, 올바른 준비가 필수입니다. 이번 블로그 포스트에서는 여행자가 가져가야 할 10가지 필수 아이템을 상세히 소개합니다. 첫째, 편안한 여행을 위한 양질의 여행 가방. 두 번째는 다양한 환경에 대비할 수 있는 다용도 의류. 세 번째 아이템은 여행 중 긴급 상황에 대비한 응급 키트입니다. 네 번째는 휴대용 충전기와 보조 배터리로, 언제 어디서든 기기를 충전할 수 있게 해줍니다. 다섯 번째는 고성능 카...`,
      authorNickname: '우아한 코끼리',
      postAuthorMajor: 'PLANNING',
    },
    reaction: '👍🏻',
    scrap: false,
    updatedAt: time.subtract(9, 'day').toString(),
  },
];

const fetchReaction = (): Promise<typeof postList> => {
  // TODO: 반응한 글 리스트 불러오는 api 연동 (Infinity Scroll)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(postList);
    }, 500);
  });
};

const ReactionContent = async () => {
  // const { data } = useHistoryQuery({ historyType: 'REACTIONS' });
  const list: typeof postList = await fetchReaction();

  return (
    <ContentContainer>
      {/* {data?.list?.map((v) => ( */}
      {
        list.map((v) => (
          <PostCard key={`reaction-${v.post.postId}`} {...v.post}>
            <>
              <FlexRowDiv>
                <ReactionButton>
                  <Image
                    alt="리액션 아이콘"
                    src={`${IMAGE_CDN}/qna/EmojiThumbsUp.png`}
                    width={24}
                    height={24}
                  />
                </ReactionButton>
                <DividerDiv />
                <CommentCountDiv>
                  <Image
                    alt="댓글 아이콘"
                    src={`${IMAGE_CDN}/qna/Icon_Comment.png`}
                    width={24}
                    height={24}
                  />
                  <CommentCountP>3</CommentCountP>
                </CommentCountDiv>
              </FlexRowDiv>

              <ScarpIcon
                alt="스크랩 아이콘"
                src={`${IMAGE_CDN}/icon/ScrapButton_${v.scrap ? 'active' : 'inactive'}.png`}
                width={24}
                height={24}
              />
            </>
          </PostCard>
        ))
        // :
        // <SkeletonComp.TabsUI/>
      }
    </ContentContainer>
  );
};

export default ReactionContent;
