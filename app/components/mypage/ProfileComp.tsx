'use client';

import Image from 'next/image';
import { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { fileToBase64 } from '@/app/utils/file';
import useProfileMutation from '@/app/api/auth/profile/mutations';
import useAuth from '@/app/hooks/useAuth';

const ProfileDiv = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
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
    width: 128px;
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

const LogoutP = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 16px;
  border-bottom: 1px solid #a3a3a3;
`;

const ProfileComp = () => {
  const { logout, userInfo, updateUser } = useAuth();
  const { mutateAsync: profileMutation } = useProfileMutation();

  const nicknameInputRef = useRef<HTMLInputElement | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profileBase64, setProfileBase64] = useState<string | null>(null);
  const [isModify, setIsModify] = useState(false);

  const createUpateData = useCallback(async () => {
    const updateData: { [key: string]: string } = {};
    let isUpdate = false;

    // 프로필 이미지 Storage 저장하기
    if (profileFile) {
      isUpdate = true;
      const { success, fullPath } = await profileMutation(profileFile);
      if (success) {
        updateData['profile_url'] = fullPath;
      } else {
        // TODO: 에러처리
        console.log('error');
      }
    }
    const nickname = nicknameInputRef.current?.value as string;
    if (nickname !== userInfo?.user.nick_name) {
      isUpdate = true;
      updateData['nick_name'] = nickname;
    }

    return isUpdate ? updateData : false;
  }, [profileFile, nicknameInputRef.current]);

  const handleModifyButton = useCallback(async () => {
    setIsModify((v) => !v);
    if (isModify) {
      const updateData = await createUpateData();

      if (updateData) {
        await updateUser(updateData);
        setProfileFile(null);
      }
    }
  }, [isModify, createUpateData]);

  const clickModifyIcon = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg';
    input.click();

    input.addEventListener('change', async () => {
      if (input.files) {
        setProfileFile(input.files[0]);
      } else {
        // TODO: 에러처리
        console.log('error');
      }
    });
  }, []);

  useEffect(() => {
    if (profileFile) {
      fileToBase64(profileFile).then((v) => {
        setProfileBase64(v);
      });
    } else {
      setProfileBase64(null);
    }
  }, [profileFile]);

  return (
    <ProfileDiv>
      <ProfileImageDiv>
        <Image
          src={profileBase64 || '/' + userInfo?.user.profile_url || '/next.svg'}
          alt="프로필 이미지"
          fill={true}
        />
        {isModify && (
          <Image
            src={'/vercel.svg'}
            alt="수정아이콘"
            fill={true}
            onClick={clickModifyIcon}
            style={{ cursor: 'pointer', zIndex: 10 }}
          />
        )}
      </ProfileImageDiv>

      <ProfileTextDiv>
        <TitleP>
          <strong>프로필</strong>
          <ModifyButton onClick={handleModifyButton}>{isModify ? '완료' : '수정하기'}</ModifyButton>
        </TitleP>
        <NicknameDiv>
          {isModify ? (
            <NicknameInput ref={nicknameInputRef} defaultValue={userInfo?.user.nick_name} />
          ) : (
            <p>{userInfo?.user.nick_name}</p>
          )}
        </NicknameDiv>
        <TagP>태그</TagP>
      </ProfileTextDiv>
      <LogoutP onClick={logout}>로그아웃</LogoutP>
    </ProfileDiv>
  );
};

export default ProfileComp;
