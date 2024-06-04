'use client';

import Image from 'next/image';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import useAuth from '@/app/hooks/useAuth';
import { PROFILE_CDN } from '@/app/constants/externalUrls';

const Button = styled.button`
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 12px;
  background: rgba(55, 56, 60, 0.1);
`;

export const ProfileButton = () => {
  const { userInfo } = useAuth();
  const { push } = useRouter();

  const profileUrl = useMemo(() => {
    return userInfo?.user?.profile_url || '/default.png';
  }, [userInfo?.user]);

  const handleProfileClick = useCallback(() => {
    if (userInfo?.user) push('/mypage');
    else push('/login');
  }, [userInfo?.user]);

  return (
    <Button onClick={handleProfileClick}>
      <Image alt="프로필 이미지" src={`${PROFILE_CDN}/${profileUrl}`} fill sizes="36px" />
    </Button>
  );
};

export default ProfileButton;
