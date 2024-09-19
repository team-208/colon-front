'use client';

import Image from 'next/image';
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

const ReactionContent = () => {
  const { data } = useHistoryQuery({ historyType: 'REACTIONS' });

  return (
    <ContentContainer>
      {data?.list?.map((v) => (
        <PostCard key={`reaction-${v.post.postId}`} {...v.post}>
          <>
            <FlexRowDiv>
              <ReactionButton>
                {/* TODO: Icon comp 추가시 변경 필요. */}
                <Image
                  alt="리액션 아이콘"
                  src={`${IMAGE_CDN}/qna/Emoji${v.post.userReaction ?? 'Add'}.png`}
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
              src={`${IMAGE_CDN}/icon/ScrapButton_${v?.post.isScrap ? 'active' : 'inactive'}.png`}
              width={24}
              height={24}
            />
          </>
        </PostCard>
      ))}
    </ContentContainer>
  );
};

export default ReactionContent;
