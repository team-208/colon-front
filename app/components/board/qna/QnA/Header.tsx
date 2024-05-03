'use client';

import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import { Dayjs } from 'dayjs';
import styled from 'styled-components';
import { JOB_GROUP_LABELS } from '../../../common/constants';
import { dateText } from '@/app/utils/text';

interface Props {
  className?: string;
  authorMajor: JOB_GROUP_TYPES;
  requestedMajor: JOB_GROUP_TYPES;
  nickname: string;
  updatedAt: Dayjs;
}

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

const Header = ({ className, authorMajor, requestedMajor, nickname, updatedAt }: Props) => {
  return (
    <div className={className}>
      <MajorP>
        <span>{JOB_GROUP_LABELS[authorMajor] ?? ''}</span>
        <span>
          {`>`}
          {JOB_GROUP_LABELS[requestedMajor] ?? ''}
        </span>
      </MajorP>

      <AuthorP>
        <span>{nickname}</span>
        <span>•</span>
        <span>{dateText(updatedAt)} (편집됨)</span>
      </AuthorP>
    </div>
  );
};

export default Header;
export type HeaderType = { Header: typeof Header };
