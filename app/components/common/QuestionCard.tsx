'use client';

import dayjs, { Dayjs } from 'dayjs';
import styled from 'styled-components';
import { JOB_GROUP_LABELS } from './constants';
import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import { dateText } from '@/app/utils/text';

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
    </ContainerArticle>
  );
};

export default QuestionCard;
