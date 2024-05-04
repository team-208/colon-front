'use client';

import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import { Dayjs } from 'dayjs';
import PostComp from '../../../common/PostComp';
import DividerComp from '@/app/components/common/DividerComp';
import styled from 'styled-components';
import Image from 'next/image';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import { useMemo } from 'react';

// TODO: post api response로 interface 수정 필요.
interface Props {
  status: string;
  requestedMajor: JOB_GROUP_TYPES;
  title: string;
  body: string;
  tags: string[];
  createdAt: Dayjs;
  updatedAt: Dayjs;
  author_nickname: string;
  author_major: JOB_GROUP_TYPES;
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

const CheckLabelBoxDiv = styled.div`
  display: flex;
  padding: 0 20px;
  margin-top: 20px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    margin-top: 16px;
    padding: 0 17px 0 20px;
  }
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

const QnAReactionCount = styled(PostComp.ReactionCount)`
  padding: 0 20px;
  margin: 28px 0 32px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    margin: 20px 0 18px;
    padding: 0 17px 0 20px;
  }
`;

const QnADetailContent = ({
  status,
  requestedMajor,
  title,
  body,
  tags,
  createdAt,
  updatedAt,
  author_nickname,
  author_major,
}: Props) => {
  const isComplete = useMemo(() => status === 'COMPLETE', []);

  return (
    <ConatinerArticle>
      <QnAHeader
        authorMajor={author_major}
        requestedMajor={requestedMajor}
        nickname={author_nickname}
        updatedAt={updatedAt ?? createdAt}
      />

      <DividerComp.Horizonal height={1} />

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

      <TitleP>{title}</TitleP>
      <BodyDiv dangerouslySetInnerHTML={{ __html: body }} />

      <TagListUl>{tags?.map((tag, idx) => <li key={`qna-tag-${idx}`}>{tag}</li>)}</TagListUl>

      <QnAReactionCount emojiCount={8} commentCount={3} />

      <DividerComp.Horizonal height={1} />
    </ConatinerArticle>
  );
};

export default QnADetailContent;
