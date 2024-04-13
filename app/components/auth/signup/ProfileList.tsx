'use client';

import React from 'react';
import styled from 'styled-components';

export type PROFILE_TYPES = 'RANDOM' | 'KAKAO';
interface JobGroupListProps {
  profile: PROFILE_TYPES;
  kakaoNickname: string;
  randomNickname: string;
  onClick: (profile: PROFILE_TYPES) => void;
}

const ContainerUl = styled.ul`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-column-gap: 20px;
`;

const ProfileButton = styled.button<{ $isActive: boolean }>`
  width: 100%;
  padding: 8px 16px;
  border-radius: 2px;
  background-color: ${({ $isActive }) => ($isActive ? '#c3c3c3' : 'white')};
  border: 1px solid #c3c3c3;
`;

const ProfileList = ({ profile, kakaoNickname, randomNickname, onClick }: JobGroupListProps) => {
  return (
    <ContainerUl>
      <li>
        <ProfileButton $isActive={profile === 'KAKAO'} onClick={() => onClick('KAKAO')}>
          이름 - {kakaoNickname}
        </ProfileButton>
      </li>
      <li>
        <ProfileButton $isActive={profile === 'RANDOM'} onClick={() => onClick('RANDOM')}>
          랜덤 닉네임 - {randomNickname}
        </ProfileButton>
      </li>
    </ContainerUl>
  );
};

export default React.memo(ProfileList);
