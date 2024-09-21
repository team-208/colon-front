'use client';

import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import useAuth from '@/app/hooks/useAuth';
import { PROFILE_CDN, IMAGE_CDN } from '@/app/constants/externalUrls';
import DropDown from '../common/DropDown';

interface Props {
  isModify: boolean;
  updateProfileFile: (file: File | null) => void;
}

const ContainerDiv = styled.div`
  position: relative;
  width: max-content;
  height: max-content;
`;

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

const DropDownUl = styled.ul`
  padding: 8px 0;

  li {
    cursor: pointer;
    width: max-content;
    min-width: 100px;
    height: 32px;
    padding: 6px 12px;
    ${({ theme }) => theme.font.caption1}
    color: ${({ theme }) => theme.color.label.normal};
    font-weight: 400;
  }
`;

const ProfileImage = (props: Props) => {
  const { userInfo } = useAuth();
  const { isModify, updateProfileFile } = props;
  const [profile, setProfile] = useState<File | null>(null);
  const [isReset, setIsReset] = useState(false);
  const [isClick, setIsClick] = useState(false);

  const imageSrc = useMemo(() => {
    const modifiedProfileUrl = profile && URL.createObjectURL(profile);

    return isReset
      ? `${PROFILE_CDN}/default_${userInfo?.user?.major}.png`
      : modifiedProfileUrl ||
          `${PROFILE_CDN}/${userInfo?.user?.profile_url || `default_${userInfo?.user?.major}.png`}`;
  }, [isReset, profile, userInfo?.user]);

  const clickModifyIcon = () => {
    setIsClick((v) => !v);
  };

  const modifyProfile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg';
    input.click();
    setIsClick(false);

    input.addEventListener('change', async () => {
      if (input.files) {
        setProfile(input.files[0]);
        setIsReset(false);
      } else {
        // TODO: 에러처리
        console.log('error');
      }
    });
  };

  const resetProfile = () => {
    setIsClick(false);
    setIsReset(true);
  };

  useEffect(() => {
    if (profile) {
      updateProfileFile(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (!isModify) {
      setProfile(null);
      setIsClick(false);
      setIsReset(false);
    }
  }, [isModify]);

  return (
    <ContainerDiv>
      <ProfileImageDiv>
        <Image src={imageSrc} alt="프로필 이미지" fill sizes="72px" />
        {isModify && (
          <ModifyImageDiv onClick={clickModifyIcon}>
            <Image src={`${IMAGE_CDN}/icon/Camera.png`} alt="수정아이콘" width={32} height={32} />
          </ModifyImageDiv>
        )}
      </ProfileImageDiv>
      <DropDown isActive={isClick} distance={{ desktop: 10, mobile: 8 }}>
        <DropDownUl>
          <li onClick={modifyProfile}>
            <p>프로필 사진 추가</p>
          </li>
          <li onClick={resetProfile}>
            <p>기본사진으로 돌아가기</p>
          </li>
        </DropDownUl>
      </DropDown>
    </ContainerDiv>
  );
};

export default ProfileImage;
