'use client';

import dayjs, { Dayjs } from 'dayjs';
import styled from 'styled-components';
import { JOB_GROUP_LABELS } from './constants';
import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import { dateText } from '@/app/utils/text';
import Image from 'next/image';
import { IMAGE_CDN } from '@/app/constants/externalUrls';

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

const ArticleHeaderDiv = styled.div`
  padding-left: 4px;
`;

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

const AuthorP = styled.p`
  display: flex;
  align-items: center;
  margin: 6px 0 10px;
  padding-left: 2px;
  ${({ theme }) => theme.font.caption1};
  color: ${({ theme }) => theme.color.palette.coolNeutral25};

  & > span:first-of-type {
    display: inline-block;
    ${({ theme }) => theme.font.body3};
    color: ${({ theme }) => theme.color.static.dark};
    margin-right: 4px;
  }

  & > span:last-of-type {
    display: inline-block;
    margin-left: 4px;
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.caption2};

    & > span:first-of-type {
      ${({ theme }) => theme.font.caption1};
    }
  }
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
  height: 94px;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${({ theme }) => theme.color.palette.coolNeutral23};

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.body2};
  }
`;

const CommentCountDiv = styled.div`
  ${({ theme }) => theme.font.body3};
  display: flex;
  align-items: center;
`;

const CountSpan = styled.span`
  display: inline-block;
  margin-left: 4px;

  & > strong {
    color: ${({ theme }) => theme.color.primary.normal};
  }
`;

const SeperatorSpan = styled.span`
  margin: 0 8px;
  ${({ theme }) => theme.font.caption2};
  font-weight: 400;
`;

const CommentDiv = styled.div``;

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
      <ArticleHeaderDiv>
        <MajorP>
          <span>{JOB_GROUP_LABELS[author_major] ?? ''}</span>
          <span>
            {`>`}
            {JOB_GROUP_LABELS[requestedMajor] ?? ''}
          </span>
        </MajorP>

        <AuthorP>
          <span>{author_nickname}</span>
          <span>•</span>
          <span>{dateText(updatedAt.add(-9, 'minute'))}분 전 (편집됨)</span>
        </AuthorP>
      </ArticleHeaderDiv>

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

          <CommentCountDiv>
            <Image
              alt="엄지척 이모지"
              src={`${IMAGE_CDN}/qna/EmojiThumbsUp.png`}
              width={16}
              height={16}
            />
            <Image
              alt="하트 이모지"
              src={`${IMAGE_CDN}/qna/EmojiHeartEyes.png`}
              width={16}
              height={16}
            />
            <Image
              alt="웃음 이모지"
              src={`${IMAGE_CDN}/qna/EmojiLaughing.png`}
              width={16}
              height={16}
            />
            <CountSpan>X</CountSpan>
            <SeperatorSpan>|</SeperatorSpan>
            <CountSpan>
              <strong>CO:</strong> X
            </CountSpan>
            (댓글 영역 추가 개발 필요)
          </CommentCountDiv>
        </ContentDiv>
        <CommentDiv>
          <p></p>
        </CommentDiv>
      </ArticleBodyDiv>
    </ContainerArticle>
  );
};

export default QuestionCard;
