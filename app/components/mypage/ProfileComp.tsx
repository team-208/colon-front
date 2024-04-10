'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';
import styled from 'styled-components';

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

const TitleP = styled.p`
  font-size: 24px;
`;

const ModifyButton = styled.button`
  font-size: 20px;
  padding: 10px;
  background: none;
  border: none;
  outline: none;
`;

const NicknameDiv = styled.div`
  > * {
    width: 64px;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    padding: 0;
  }
`;

const NicknameInput = styled.input`
  border: none;
  border-bottom: 1px solid #a3a3a3;
  outline: none;
`;

const TagP = styled.p`
  padding: 2px;
  text-align: center;
  font-size: 24px;
  border-radius: 8px;
  background-color: #e0e0e0;
`;

const ProfileComp = () => {
  // TODO: 초깃값 설정 (recoil)
  const [nickname, setNickname] = useState('닉네임');
  const [isModify, setIsModify] = useState(false);

  const handleModifyButton = useCallback(() => {
    setIsModify((v) => !v);
    if (isModify) {
      // TODO: 프로필 이미지, 닉네임 수정 API 연동
      // TODO: 이미지나, 닉네임 변경점이 없을 때 처리

      console.log('프로필 수정');
    }
  }, [isModify]);

  const clickModifyIcon = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg';
    input.click();

    input.addEventListener('change', (e) => {
      console.log(input.files);
    });
  }, []);

  return (
    <ProfileDiv>
      <ProfileImageDiv>
        {isModify ? (
          <Image
            src={'/vercel.svg'}
            alt="수정아이콘"
            fill={true}
            onClick={clickModifyIcon}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <Image src={'/next.svg'} alt="프로필 이미지" fill={true} />
        )}
      </ProfileImageDiv>

      <ProfileTextDiv>
        <TitleP>
          <strong>프로필</strong>
          <ModifyButton onClick={handleModifyButton}>{isModify ? '완료' : '수정하기'}</ModifyButton>
        </TitleP>
        <NicknameDiv>
          {isModify ? (
            <NicknameInput
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
          ) : (
            <p>{nickname}</p>
          )}
        </NicknameDiv>
        <TagP>태그</TagP>
      </ProfileTextDiv>
    </ProfileDiv>
  );
};

export default ProfileComp;
