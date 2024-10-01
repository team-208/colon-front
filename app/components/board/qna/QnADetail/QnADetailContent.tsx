'use client';

import PostComp from '../../../common/PostComp';
import DividerComp from '@/app/components/common/DividerComp';
import styled from 'styled-components';
import Image from 'next/image';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import React, { useEffect, useMemo } from 'react';
import { GetPostResponse } from '@/app/api/post/[id]/type';
import usePostScrapQuery from '@/app/api/post/scrap/queries';
import Selector from '@/app/components/common/Selector';
import { useRouter } from 'next/navigation';
import useAuth from '@/app/hooks/useAuth';
import { useDeletePostMutation } from '@/app/api/post/[id]/mutations';
import useUserReactionsQuery from '@/app/api/auth/user/reactions/queries';
import ButtonComp from '@/app/components/common/ButtomComp';

// TODO: post api response로 interface 수정 필요.
interface Props {
  post: GetPostResponse;
}

const ConatinerArticle = styled.article`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
`;

const QnAHeader = styled(PostComp.Header)`
  padding: 0 20px;
  margin: 20px 0 10px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    margin: 20px 0 12px;
    padding: 0 17px 0 20px;
  }
`;

const SubtitleBoxDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  margin-top: 20px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    margin-top: 16px;
    padding: 0 17px 0 20px;
  }
`;

const ModifyOption = styled(Selector.Option)`
  color: ${({ theme }) => theme.color.label.normal};
`;

const DeleteOption = styled(Selector.Option)`
  color: ${({ theme }) => theme.color.status.destructive};
`;

const ReportButton = styled(ButtonComp.OutlinedPrimary)`
  padding: 4px 8px;
  border-radius: 7px;
  ${({ theme }) => theme.font.caption2};
`;

const CheckLabelBoxDiv = styled.div`
  display: flex;
`;

const CheckLabelP = styled.p<{ $isComplete: boolean }>`
  padding: 6px 8px;
  ${({ theme }) => theme.font.caption1};
  color: ${({ $isComplete, theme }) =>
    $isComplete ? theme.color.static.light : theme.color.label.normal};
  border-radius: 8px;
  margin-left: 8px;
  background-color: ${({ $isComplete, theme }) =>
    $isComplete ? theme.color.primary.normal : theme.color.palette.coolNeutral97};
`;

const TitleP = styled.p`
  ${({ theme }) => theme.font.heading1};
  padding: 0 20px;
  margin: 16px 0;

  ${({ theme }) => theme.mediaQuery.mobile} {
    margin: 16px 0 10px;
    padding: 0 17px 0 20px;
  }
`;

const BodyDiv = styled.div`
  ${({ theme }) => theme.font.body1};
  font-weight: 400;
  white-space: pre-line;
  padding: 0 20px;
  margin-bottom: 16px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 0 17px 0 20px;
  }
`;

const TagListUl = styled.ul`
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  margin: -4px;

  & > li {
    margin: 4px;
    padding: 6px 8px;
    border-radius: 8px;
    ${({ theme }) => theme.font.caption1};
    color: ${({ theme }) => theme.color.primary.normal};
    background-color: ${({ theme }) => theme.color.palette.deepSkyBlue99};
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 0 17px 0 20px;
  }
`;

const PostFooterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin: 28px 0 32px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    margin: 20px 0 18px;
    padding: 0 17px 0 20px;
  }
`;

const QnADetailContent = ({ post }: Props) => {
  const {
    id,
    status,
    requested_major,
    title,
    body,
    tags,
    created_at,
    updated_at,
    author_nickname,
    author_major,
    reactions,
    comments_count,
    accept_comment_id,
  } = post;
  // TODO: tanstack query hydrate 적용 필요.
  const { data: userScrapData } = usePostScrapQuery();
  const { data: userReactions } = useUserReactionsQuery();

  const { mutateAsync } = useDeletePostMutation();

  const { push, replace } = useRouter();
  const { userInfo } = useAuth();

  const isComplete = useMemo(() => status === 'COMPLETE' && accept_comment_id?.length > 0, []);
  const isScrap = useMemo(
    () => userScrapData?.list.find((item) => item.post_id === id),
    [userScrapData],
  );

  const handleDeletePost = () => {
    mutateAsync(id);
    push('/qna');
  };

  const handleReport = () => {
    // TODO: Post 신고 API 연동
  };

  useEffect(() => {
    if (!post.success) {
      replace('/qna');
      // TODO: usePostListQuery refetch 필요. filter query string으로 Or recoil로 바꾸기.
    }
  }, []);

  return (
    <ConatinerArticle>
      <QnAHeader
        authorMajor={author_major}
        requestedMajor={requested_major}
        nickname={author_nickname}
        createdAt={created_at}
        updatedAt={updated_at}
      />

      <DividerComp.Horizonal height={1} />

      <SubtitleBoxDiv>
        <CheckLabelBoxDiv>
          <Image
            alt="답변 체크"
            src={`${IMAGE_CDN}/qna/CheckMarkButton${isComplete ? '_checked' : '_disable'}.png`}
            width={28}
            height={28}
          />
          <CheckLabelP $isComplete={isComplete}>
            {isComplete ? '답변 채택 완료!' : '답변 대기중'}
          </CheckLabelP>
        </CheckLabelBoxDiv>

        {userInfo?.user?.nick_name === author_nickname ? (
          <Selector
            defaultOption={{ idx: 0, text: '최신순' }}
            selectorButton={
              <Image
                alt="더보기 아이콘"
                src={`${IMAGE_CDN}/icon/dots.png`}
                width={16}
                height={16}
              />
            }
          >
            <ModifyOption
              idx={0}
              text="수정"
              clickEvent={() => {
                push(`/qna/${id}/modify`);
              }}
            />
            <DeleteOption idx={1} text="삭제" clickEvent={handleDeletePost} />
          </Selector>
        ) : (
          <ReportButton isActive onClick={handleReport}>
          신고
        </ReportButton>
        )}
      </SubtitleBoxDiv>

      <TitleP>{title}</TitleP>
      <BodyDiv dangerouslySetInnerHTML={{ __html: body }} />

      <TagListUl>{tags?.map((tag, idx) => <li key={`qna-tag-${idx}`}>{tag}</li>)}</TagListUl>

      <PostFooterDiv>
        <PostComp.CountBox
          postId={id}
          reactionCountObj={JSON.parse(reactions)}
          userReaction={
            userReactions?.posts?.find((item) => item.postId === id.toString())?.reactions
          }
          commentCount={comments_count}
        />
        <PostComp.ScrapButton postId={id} isScrap={!!isScrap} />
      </PostFooterDiv>

      <DividerComp.Horizonal height={1} />
    </ConatinerArticle>
  );
};

export default QnADetailContent;
