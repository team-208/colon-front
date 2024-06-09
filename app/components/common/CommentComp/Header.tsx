'use client';

import styled from 'styled-components';
import { JOB_GROUP_LABELS } from '../../constants';
import { dateText } from '@/app/utils/text';
import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import dayjs from 'dayjs';
import Image from 'next/image';
import { IMAGE_CDN } from '@/app/constants/externalUrls';

interface Props {
  major: JOB_GROUP_TYPES;
  nickname: string;
  updatedAt: string;
  isSelected: boolean;
}

const ContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const UserInfoDiv = styled.div`
  display: flex;
`;

const MajorP = styled.p<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.font.caption1};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.color.static.light : theme.color.label.normal};
  background: ${({ $isSelected, theme }) =>
    $isSelected ? theme.color.gradient.normal : theme.color.palette.coolNeutral97};
  border-radius: 5px;
  padding: 2px 6px;

  & > img {
    margin-right: 2px;
  }
`;

const AuthorP = styled.p`
  display: flex;
  align-items: center;
  margin-left: 6px;
  ${({ theme }) => theme.font.caption1};
  color: ${({ theme }) => theme.color.label.normal};
  font-weight: 400;

  & > span:first-of-type {
    display: inline-block;
    ${({ theme }) => theme.font.body2};
    margin-right: 2px;
  }

  & > span:last-of-type {
    display: inline-block;
    margin-left: 2px;
  }
`;

const Header = ({ major, nickname, updatedAt, isSelected }: Props) => {
  return (
    <ContainerDiv>
      <UserInfoDiv>
        <MajorP $isSelected={isSelected}>
          {isSelected && (
            <Image alt="채택 아이콘" src={`${IMAGE_CDN}/icon/Crown.png`} width={14} height={14} />
          )}
          {JOB_GROUP_LABELS[major] ?? ''}
        </MajorP>

        <AuthorP>
          <span>{nickname}</span>
          <span>•</span>
          <span>{dateText(dayjs(updatedAt))} (편집됨)</span>
        </AuthorP>
      </UserInfoDiv>

      <button>
        <Image alt="더보기 아이콘" src={`${IMAGE_CDN}/icon/dots.png`} width={16} height={16} />
      </button>
    </ContainerDiv>
  );
};

export default Header;
export type HeaderType = { Header: typeof Header };
