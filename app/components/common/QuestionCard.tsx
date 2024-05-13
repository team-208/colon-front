'use client';

import { Dayjs } from 'dayjs';
import styled from 'styled-components';
import { JOB_GROUP_LABELS } from './constants';
import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import Image from 'next/image';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import PostComp from './PostComp';
import React from 'react';

// TODO: post api response로 interface 수정 필요.
interface Props {
  status: string;
  requestedMajor: JOB_GROUP_TYPES;
  title: string;
  bodyUrl: string;
  previewBody: string;
  tages: string[];
  createdAt: Dayjs;
  updatedAt: Dayjs;
  author_nickname: string;
  author_major: JOB_GROUP_TYPES;
  author_profile_url: string;
}

const ContainerArticle = styled.article`
  margin-top: 50px;
  padding: 20px;
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

const QnAReactionCount = styled(PostComp.ReactionCount)`
  margin-top: 26px;

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
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    & > span:last-of-type {
      ${({ theme }) => theme.font.caption1};
    }
  }
`;

const CommentBodyP = styled.p`
  ${({ theme }) => theme.font.body2};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.body3};
  }
`;

const QuestionCard = ({
  status,
  requestedMajor,
  title,
  bodyUrl,
  previewBody,
  tages,
  createdAt,
  updatedAt,
  author_nickname,
  author_major,
  author_profile_url,
}: Props) => {
  return (
    <ContainerArticle>
      <QnAHeader
        authorMajor={author_major}
        requestedMajor={requestedMajor}
        nickname={author_nickname}
        updatedAt={updatedAt.format('YYYY-MM-DD HH:mm:ss')}
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

          <ContentPreviewBodyP>{previewBody}</ContentPreviewBodyP>

          <QnAReactionCount emojiCount={8} commentCount={3} />
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
