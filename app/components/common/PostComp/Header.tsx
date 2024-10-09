'use client';

import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { dateText } from '@/app/utils/text';
import MajorBox from './MajorBox';

interface Props {
  className?: string;
  authorMajor: JOB_GROUP_TYPES;
  requestedMajor: JOB_GROUP_TYPES;
  nickname: string;
  createdAt: string;
  updatedAt: string;
}

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

const Header = ({ className, authorMajor, requestedMajor, nickname, createdAt, updatedAt }: Props) => {
  return (
    <div className={className}>
      <MajorBox authorMajor={authorMajor} requestedMajor={requestedMajor} />

      <AuthorP>
        <span>{nickname}</span>
        <span>•</span>
        <span>{dateText(dayjs(updatedAt))} {updatedAt !== createdAt &&'(편집됨)'}</span>
      </AuthorP>
    </div>
  );
};

export default Header;
export type HeaderType = { Header: typeof Header };
