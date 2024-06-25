'use client';

import Image from 'next/image';
import dayjs from 'dayjs';
import styled from 'styled-components';
import PostComp from '../common/PostComp';
import PostCard from './PostCard';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import useHistoryQuery from '@/app/api/auth/history/queries';
import { HistoryItemProps } from '@/app/api/auth/history/type';

const ContentContainer = styled.div`
  padding: 24px 0 20px 0;

  > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const ScrapButton = styled(PostComp.ScrapButton)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-items: center;
  align-items: center;
`;

const ScrapContent = () => {
  const { data } = useHistoryQuery({ historyType: 'SCRAP' });

  return (
    <ContentContainer>
      {data?.list?.map(({ post }) => (
        <PostCard key={`reaction-${post.postId}`} {...post}>
          <>
            <div>
              <PostComp.CountBox
                postId={post.postId}
                reactionCountObj={{
                  ThumbsUp: 1,
                  Pushpin: 2,
                  FaceWithMonocle: 0,
                  ExplodingHead: 0,
                  SmilingHeart: 5,
                }}
                reactionDisabled
                commentCount={3}
              />
            </div>

            <div>
              <ScrapButton postId={post.postId} isScrap={true} />
            </div>
          </>
        </PostCard>
      ))}
    </ContentContainer>
  );
};

export default ScrapContent;
