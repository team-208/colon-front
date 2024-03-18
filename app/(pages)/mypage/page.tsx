'use client';

import { useState, useCallback } from 'react';
import styled from 'styled-components';

const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  > *:not(:last-child) {
    margin-bottom: 24px;
  }
`;

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

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TitleStrong = styled.strong`
  font-size: 24px;
`;

// TODO: 디자인시 NicnameP, NicknameInput width 통일
const NicknameP = styled.p`
  display: inline-block;
  width: 64px;
`;

const NicknameInput = styled.input`
  display: inline-block;
  width: 64px;
`;

const NicknameButton = styled.button`
  display: inline-block;
`;

const TagP = styled.p`
  padding: 2px;
  text-align: center;
  font-size: 24px;
  border-radius: 8px;
  background-color: #e0e0e0;
`;

const NicnameComponent = () => {
  const [isModify, setIsModify] = useState(false);
  const [value, setValue] = useState('닉네임');

  const handleClickButton = useCallback(() => {
    if (isModify) {
      // TODO: 닉네임 수정 api 연동
      console.log('닉네임 수정', value);
    }

    setIsModify((v) => !v);
  }, [isModify, value]);

  return (
    <div>
      {isModify ? (
        <NicknameInput value={value} onChange={(e) => setValue(e.target.value)} />
      ) : (
        <NicknameP>{value}</NicknameP>
      )}
      <NicknameButton onClick={handleClickButton}>
        {isModify ? '저장 아이콘' : '수정 아이콘'}
      </NicknameButton>
    </div>
  );
};

export default function MyPage() {
  return (
    <ContainerMain>
      <ProfileDiv>
        <ProfileImageDiv>
          <ProfileImage alt="프로필 이미지" />
        </ProfileImageDiv>

        <ProfileTextDiv>
          <TitleStrong>프로필</TitleStrong>
          <NicnameComponent />
          <TagP>태그</TagP>
        </ProfileTextDiv>
      </ProfileDiv>

      <div>TabList</div>
    </ContainerMain>
  );
}
