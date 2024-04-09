'use client';

import Image from 'next/image';
import styled from 'styled-components';
import NicknameInputComp from './NicknameInputComp';

const ProfileDiv = styled.div`
  display: flex;
  flex-directioin: row;
`;

const ProfileImageDiv = styled.div`
  width: 140px;
  height: 140px;
  position: relative;
  overflow: hidden;
  margin-right: 24px;
  border-radius: 50%;
  background-color: #e0e0e0;
`;

const ProfileTextDiv = styled.div`
  display: flex;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const TitleStrong = styled.strong`
  font-size: 24px;
`;

const TagP = styled.p`
  padding: 2px;
  text-align: center;
  font-size: 24px;
  border-radius: 8px;
  background-color: #e0e0e0;
`;

const ProfileComp = () => {
  return (
    <ProfileDiv>
      <ProfileImageDiv>
        <Image src={'/next.svg'} alt="프로필 이미지" fill={true} />
      </ProfileImageDiv>

      <ProfileTextDiv>
        <TitleStrong>프로필</TitleStrong>
        <NicknameInputComp />
        <TagP>태그</TagP>
      </ProfileTextDiv>
    </ProfileDiv>
  );
};

export default ProfileComp;
