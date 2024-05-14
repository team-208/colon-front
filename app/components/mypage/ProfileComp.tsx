'use client';

import { useState, useRef } from 'react';
import styled from 'styled-components';
import useProfileMutation from '@/app/api/auth/profile/mutations';
import useAuth from '@/app/hooks/useAuth';
import ProfileImageComp from './ProfileImageComp';
import { isEmpty } from 'lodash';

interface UpdateUserRequest {
  profile_url?: string;
  nick_name?: string;
}

const ProfileDiv = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
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

const ProfileButton = styled.button`
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
  const [updateProfile, setUpdateProfile] = useState<File | null>(null);
  const [isModify, setIsModify] = useState(false);

  const createUpateData = async (): Promise<UpdateUserRequest> => {
    let updateData: UpdateUserRequest = {};

    const updateNickName = nicknameInputRef.current?.value as string;
    if (updateNickName !== userInfo?.user.nick_name) {
      updateData.nick_name = updateNickName;
    }

    if (updateProfile) {
      // 프로필 이미지 Storage 저장하기
      const { success, path } = await profileMutation(updateProfile);
      if (success) {
        updateData.profile_url = path;
      } else {
        // TODO: 에러처리
        console.log('error');
      }
    }

    return updateData;
  };

  const handleModifyButton = async () => {
    setIsModify((v) => !v);
    if (isModify) {
      const updateData = await createUpateData();

      if (!isEmpty(updateData)) {
        await updateUser(updateData);
        setUpdateProfile(null);
      }
    }
  };

  const handleCancelButton = () => {
    setIsModify(false);
    setUpdateProfile(null);
  };

  return (
    <ProfileDiv>
      <ProfileImageComp
        isModify={isModify}
        updateProfileFile={(file: File) => setUpdateProfile(file)}
      />

      <ProfileTextDiv>
        <TitleP>
          <strong>프로필</strong>
          {isModify ? (
            <>
              <ProfileButton onClick={handleModifyButton}>완료</ProfileButton>
              <ProfileButton onClick={handleCancelButton}>취소</ProfileButton>
            </>
          ) : (
            <ProfileButton onClick={handleModifyButton}>수정하기</ProfileButton>
          )}
        </TitleP>
        <NicknameDiv>
          {isModify ? (
            <NicknameInput ref={nicknameInputRef} defaultValue={userInfo?.user?.nick_name} />
          ) : (
            <p>{userInfo?.user?.nick_name}</p>
          )}
        </NicknameDiv>
        <TagP>태그</TagP>
      </ProfileTextDiv>
      <LogoutP onClick={logout}>로그아웃</LogoutP>
    </ProfileDiv>
  );
};

export default ProfileComp;
