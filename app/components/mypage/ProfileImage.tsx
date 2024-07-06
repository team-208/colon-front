'use client';

import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import useAuth from '@/app/hooks/useAuth';
import { PROFILE_CDN, IMAGE_CDN } from '@/app/constants/externalUrls';

interface Props {
  isModify: boolean;
  updateProfileFile: (file: File) => void;
}

const ProfileImageDiv = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  overflow: hidden;
  margin-right: 16px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.color.line.normalOpacity.alternative};
  background-color: ${({ theme }) => theme.color.background.normal};

  ${({ theme }) => theme.mediaQuery.mobile} {
    width: 56px;
    height: 56px;
  }
`;

const ModifyImageDiv = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 5;
`;

const ProfileImage = (props: Props) => {
  const { userInfo } = useAuth();
  const { isModify, updateProfileFile } = props;
  const [profile, setProfile] = useState<File | null>(null);

  const imageSrc = useMemo(() => {
    const modifiedProfileUrl = profile && URL.createObjectURL(profile);
    return (
      modifiedProfileUrl ||
      `${PROFILE_CDN}/${userInfo?.user?.profile_url || `default_${userInfo?.user?.major}.png`}`
    );
  }, [profile, userInfo?.user]);

  const clickModifyIcon = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg';
    input.click();

    input.addEventListener('change', async () => {
      if (input.files) {
        setProfile(input.files[0]);
      } else {
        // TODO: 에러처리
        console.log('error');
      }
    });
  };

  useEffect(() => {
    if (profile) {
      updateProfileFile(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (!isModify) {
      setProfile(null);
    }
  }, [isModify]);

  return (
    <ProfileImageDiv>
      <Image src={imageSrc} alt="프로필 이미지" fill sizes="72px" />
      {isModify && (
        <ModifyImageDiv onClick={clickModifyIcon}>
          <Image src={`${IMAGE_CDN}/icon/Camera.png`} alt="수정아이콘" width={32} height={32} />
        </ModifyImageDiv>
      )}
    </ProfileImageDiv>
  );
};

export default ProfileImage;
