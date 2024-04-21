'use client';

import React, { useMemo } from 'react';
import styled from 'styled-components';

export type PROFILE_TYPES = 'RANDOM' | 'KAKAO';
interface JobGroupListProps {
  profile: PROFILE_TYPES;
  kakaoNickname: string;
  randomNickname: string;
  onClick: (profile: PROFILE_TYPES) => void;
}

const ContainerUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 16px;
  width: 284px;
`;

const ProfileButton = styled.button<{ $isActive: boolean }>`
  width: 100%;
  height: 94px;
  margin-bottom: 8px;
  padding: 10px 0;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme, $isActive }) =>
    // TODO: 디자인 가이드 수정 필요
    $isActive ? '#00A1FF33' : theme.color.background.alternative};
  border: 1px solid
    ${({ theme, $isActive }) =>
      $isActive ? theme.color.primary.normal : theme.color.line.solid.normal};
`;

const CircleDiv = styled.div<{ $isActive: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.color.static.light};
  border: 1px solid
    ${({ theme, $isActive }) =>
      $isActive ? theme.color.primary.normal : theme.color.line.solid.normal};
`;

const NameP = styled.p<{ $isActive: boolean }>`
  ${({ theme }) => theme.font.body2};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.color.label.normal : theme.color.palette.coolNeutral60};

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.body3}
  }
`;

const LabelP = styled.p<{ $isActive: boolean }>`
  ${({ theme }) => theme.font.body2};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.color.primary.normal : theme.color.label.normal};

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.body3}
  }
`;

const ProfileList = ({ profile, kakaoNickname, randomNickname, onClick }: JobGroupListProps) => {
  const isKakaoActive = useMemo(() => profile === 'KAKAO', [profile]);
  const isRandomActive = useMemo(() => profile === 'RANDOM', [profile]);

  return (
    <ContainerUl>
      <li>
        <ProfileButton $isActive={isKakaoActive} onClick={() => onClick('KAKAO')}>
          <CircleDiv $isActive={isKakaoActive} />
          <NameP $isActive={isKakaoActive}>{kakaoNickname}</NameP>
        </ProfileButton>
        <LabelP $isActive={isKakaoActive}>카카오 프로필</LabelP>
      </li>
      <li>
        <ProfileButton $isActive={isRandomActive} onClick={() => onClick('RANDOM')}>
          <CircleDiv $isActive={isRandomActive} />
          <NameP $isActive={isRandomActive}>{randomNickname}</NameP>
        </ProfileButton>
        <LabelP $isActive={isRandomActive}>랜덤 닉네임</LabelP>
      </li>
    </ContainerUl>
  );
};

export default React.memo(ProfileList);
