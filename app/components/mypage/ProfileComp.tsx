'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import useProfileMutation from '@/app/api/auth/profile/mutations';
import useAuth from '@/app/hooks/useAuth';
import ProfileImageComp from './ProfileImageComp';
import { isEmpty } from 'lodash';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';

interface UpdateUserRequest {
  profile_url?: string;
  nick_name?: string;
  major?: JOB_GROUP_TYPES;
}

const ProfileDiv = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 0 20px;
  margin: 32px 0;
`;

const ProfileTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const LabelDiv = styled.div`
  ${({ theme }) => theme.font.body3}
  display: flex;
  flex-direction: row;
  align-items: center;

  label {
    color: ${({ theme }) => theme.color.interaction.inactive};
    margin-right: 12px;
  }

  &:not(:last-of-type) {
    margin-bottom: 12px;
  }
`;

const NicknameP = styled.p`
  ${({ theme }) => theme.font.body2}
  color: ${({ theme }) => theme.color.label.normal};
  margin-bottom: 8px;
`;

const NicknameInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 220px;
  height: 30px;
  border-bottom: 1px solid ${({ theme }) => theme.color.primary.normal};
`;

const NicknameInput = styled.input`
  outline: none;
  border: none;
  flex: auto;
`;

const ModifyButton = styled.button`
  float: right;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 20px;
  margin-left: 4px;
  border-radius: 7px;
  background-color: ${({ theme }) => theme.color.palette.coolNeutral97};
  padding: 2px 4px;
`;

const CancelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TagP = styled.p`
  width: fit-content;
  ${({ theme }) => theme.font.caption1}
  color: ${({ theme }) => theme.color.primary.normal};
  background-color: ${({ theme }) => theme.color.palette.deepSkyBlue99};
  border-radius: 8px;
  padding: 4px 8px;
`;

const TagButton = styled.button<{ $isActive: boolean }>`
  width: 58px;
  height: 25px;
  ${({ theme }) => theme.font.caption1}
  padding: 4px 8px;
  border-radius: 8px;
  color: ${({ theme }) => theme.color.interaction.inactive};
  background-color: ${({ theme }) => theme.color.palette.coolNeutral99};

  ${({ theme, $isActive }) =>
    $isActive &&
    css`
      color: ${theme.color.static.light};
      background-color: ${theme.color.primary.normal};
    `}

  &:not(:last-of-type) {
    margin-right: 8px;
  }

  &:first-of-type {
    margin-left: 12px;
  }
`;

const ProfileComp = () => {
  const { logout, userInfo, updateUser } = useAuth();
  const { mutateAsync: profileMutation } = useProfileMutation();

  const nicknameInputRef = useRef<HTMLInputElement | null>(null);
  const [updateProfile, setUpdateProfile] = useState<File | null>(null);
  const [isModify, setIsModify] = useState(false);
  const [major, setMajor] = useState<JOB_GROUP_TYPES>((userInfo?.user.major as JOB_GROUP_TYPES));

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

    if (userInfo?.user.major !== major) {
      updateData.major = major;
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
    <>
      {userInfo?.user && (
        <ProfileDiv>
          <ProfileImageComp
            isModify={isModify}
            updateProfileFile={(file: File) => setUpdateProfile(file)}
          />

          <ProfileTextDiv>
            {isModify ? (
              <>
                <LabelDiv>
                  <label>닉네임</label>
                  <NicknameInputDiv>
                    <NicknameInput ref={nicknameInputRef} defaultValue={userInfo.user.nick_name} />
                    <CancelButton onClick={handleCancelButton}>
                      <Image
                        src={`${IMAGE_CDN}/icon/Close.png`}
                        alt="수정 아이콘"
                        width={18}
                        height={18}
                      />
                    </CancelButton>
                  </NicknameInputDiv>
                </LabelDiv>
                <LabelDiv>
                  <label>직군</label>
                  <TagButton $isActive={major === 'DEVELOP'} onClick={() => setMajor('DEVELOP')}>
                    개발자
                  </TagButton>
                  <TagButton $isActive={major === 'PLANNING'} onClick={() => setMajor('PLANNING')}>
                    기획자
                  </TagButton>
                  <TagButton $isActive={major === 'DESIGN'} onClick={() => setMajor('DESIGN')}>
                    디자이너
                  </TagButton>
                </LabelDiv>
              </>
            ) : (
              <>
                <NicknameP>
                  {userInfo?.user.nick_name}
                  <ModifyButton onClick={handleModifyButton}>
                    <Image
                      src={`${IMAGE_CDN}/icon/ModifyButton_inactive.png`}
                      alt="수정 아이콘"
                      width={16}
                      height={16}
                    />
                  </ModifyButton>
                </NicknameP>
                <TagP>{userInfo.user.major}</TagP>
              </>
            )}
          </ProfileTextDiv>
        </ProfileDiv>
      )}
    </>
  );
};

export default ProfileComp;
