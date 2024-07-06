'use client';

import dayjs, { Dayjs } from 'dayjs';
import styled from 'styled-components';
import { JOB_GROUP_LABELS } from '../constants';
import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import Image from 'next/image';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import PostComp from './PostComp';
import React from 'react';
import { PostListItem } from '@/app/api/post/type';

interface Props extends PostListItem {
  isScrap: boolean;
}

const ContainerArticle = styled.article`
  padding: 0 20px;
  width: 100%;
`;

const QnAHeader = styled(PostComp.Header)`
  padding-left: 4px;
`;

const ArticleBodyDiv = styled.div`
  border-radius: 12px;
  border: 0.6px solid ${({ theme }) => theme.color.line.solid.neutral};
  box-shadow: 0 0 10px #7e919d26;
  width: 100%;
`;

const ContentDiv = styled.div`
  padding: 24px 24px 16px;
  border-radius: 12px;
  border-bottom: 0.6px solid ${({ theme }) => theme.color.line.solid.neutral};

  ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 20px 24px 16px;
  }
`;

const ContentHeaderDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ContentTitleP = styled.p`
  ${({ theme }) => theme.font.heading2};
  color: ${({ theme }) => theme.color.label.normal};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-left: 8px;
`;

const ContentPreviewBodyP = styled.p`
  ${({ theme }) => theme.font.body1};
  margin-top: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  height: 78px;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${({ theme }) => theme.color.palette.coolNeutral23};

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.body2};
    -webkit-line-clamp: 4;
    height: 80px;
  }
`;

const ContentFooterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 26px;
  color: ${({ theme }) => theme.color.label.normal};

  ${({ theme }) => theme.mediaQuery.mobile} {
    margin-top: 28px;
  }
`;

const CommentDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 14px 16px 16px;

  & > div:last-of-type {
    margin-left: 8px;
    width: calc(100% - 32px);
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 14px 16px 14px;
  }
`;

const CommentUserDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;

  & > span:first-of-type {
    display: inline-block;
    ${({ theme }) => theme.font.caption1};
    margin-right: 4px;
    padding: 2px 4px;
    border-radius: 4px;
    overflow: hidden;
    /* TODO: major별 색상 분기 필요 */
    background-color: ${({ theme }) => theme.color.primary.normal};
    color: ${({ theme }) => theme.color.static.light};
  }

  & > span:last-of-type {
    ${({ theme }) => theme.font.body3};
    color: ${({ theme }) => theme.color.label.normal};
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    & > span:last-of-type {
      ${({ theme }) => theme.font.caption1};
    }
  }
`;

const CommentBodyP = styled.p`
  ${({ theme }) => theme.font.body2};
  color: ${({ theme }) => theme.color.label.normal};
  font-weight: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.body3};
  }
`;

const QuestionCard = ({
  id,
  status,
  requested_major,
  title,
  body,
  preview_body,
  tags,
  created_at,
  updated_at,
  author_nickname,
  author_major,
  author_profile_url,
  isScrap,
  reactions,
  comments_count,
}: Props) => {
  return (
    <ContainerArticle>
      <QnAHeader
        authorMajor={author_major}
        requestedMajor={requested_major}
        nickname={author_nickname}
        updatedAt={dayjs(updated_at).format('YYYY-MM-DD HH:mm:ss')}
      />

      <ArticleBodyDiv>
        <ContentDiv>
          <ContentHeaderDiv>
            <Image
              alt="답변 체크"
              src={`${IMAGE_CDN}/qna/CheckMarkButton${
                status === 'COMPLETE' ? '_checked' : '_disable'
              }.png`}
              width={20}
              height={20}
            />
            <ContentTitleP>{title}</ContentTitleP>
          </ContentHeaderDiv>

          <ContentPreviewBodyP>{preview_body}</ContentPreviewBodyP>

          <ContentFooterDiv>
            <PostComp.CountBox
              postId={id}
              reactionCountObj={reactions}
              reactionDisabled
              commentCount={comments_count}
            />
            <PostComp.ScrapButton postId={id} isScrap={!!isScrap} />
          </ContentFooterDiv>
        </ContentDiv>

        <CommentDiv>
          <Image alt="댓글 아이콘" src={`${IMAGE_CDN}/qna/Icon_Reply.png`} width={20} height={20} />

          <div>
            <CommentUserDiv>
              <span>{JOB_GROUP_LABELS['DESIGN']}</span>
              <span>댓글닉네임(댓글 영역 추가 개발 필요)</span>
            </CommentUserDiv>

            <CommentBodyP>
              개발 공부를 하면서 이런 유용한 정보를 얻을 수 있다니 정말 좋아요! 반응 남기고 갑니다~
            </CommentBodyP>
          </div>
        </CommentDiv>
      </ArticleBodyDiv>
    </ContainerArticle>
  );
};

export default React.memo(QuestionCard);
