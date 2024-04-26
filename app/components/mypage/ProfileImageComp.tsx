'use client';

import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import useAuth from '@/app/hooks/useAuth';
import { fileToBase64 } from '@/app/utils/file';

interface Props {
  isModify: boolean;
  updateProfileFile: (file: File) => void;
}

const ProfileImageDiv = styled.div`
  width: 140px;
  height: 140px;
  position: relative;
  overflow: hidden;
  margin-right: 24px;
  border-radius: 50%;
  background-color: #e0e0e0;
`;

const ProfileImageComp = (props: Props) => {
  const { userInfo } = useAuth();
  const { isModify, updateProfileFile } = props;
  const [profile, setProfile] = useState<File | null>(null);

  const imageSrc = useMemo(() => {
    const modifiedProfileUrl = profile && URL.createObjectURL(profile);
    return modifiedProfileUrl || '/next.svg' || '/' + userInfo?.user.profile_url;
  }, [profile]);

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
      <Image src={imageSrc} alt="프로필 이미지" sizes="140px" fill />
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
  );
};

export default ProfileImageComp;
