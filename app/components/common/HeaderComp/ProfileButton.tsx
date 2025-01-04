'use client';

import Image from 'next/image';
import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import useAuth from '@/app/hooks/useAuth';
import { PROFILE_CDN } from '@/app/constants/externalUrls';
import DropDown from '../DropDown';

const Container = styled.div`
  position: relative;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  overflow: hidden;
  margin-left: 12px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.color.line.normalOpacity.alternative};
  background-color: ${({ theme }) => theme.color.background.normal};
`;

const DropDownUl = styled.ul`
  padding: 8px 0;

  li {
    cursor: pointer;
    min-width: 100px;
    height: 32px;
    line-height: 20px;
    padding: 6px 12px;
    ${({ theme }) => theme.font.caption1}
    color: ${({ theme }) => theme.color.label.normal};
    font-weight: 400;

    &:last-of-type {
      color: ${({ theme }) => theme.color.interaction.inactive};
    }
  }
`;

const menuList = [
  {
    id: 1,
    text: '마이페이지',
    value: 'mypage',
  },
  {
    id: 2,
    text: '로그아웃',
    value: 'logout',
  },
  {
    id: 3,
    text: '회원탈퇴',
    value: 'withdraw,',
  },
];

export const ProfileButton = () => {
  const [isClick, setIsClick] = useState(false);
  const { userInfo, logout, deleteUser } = useAuth();
  const { push } = useRouter();

  const profileUrl = useMemo(() => {
    return userInfo?.user?.profile_url || `/default_${userInfo?.user?.major || 'user'}.png`;
  }, [userInfo?.user]);

  const handleProfileClick = useCallback(() => {
    if (userInfo?.user) setIsClick((v) => !v);
    else push('/login');
  }, [userInfo?.user]);

  const handleMenu = useCallback((menu: string) => {
    switch (menu) {
      case 'mypage':
        push('/mypage');
        break;
      case 'logout':
        logout();
        break;
      case 'withdraw':
        // TODO: 팝업 처리
        // deleteUser();
        break;
    }

    setIsClick(false);
  }, []);

  return (
    <Container>
      <Button onClick={handleProfileClick}>
        <Image alt="프로필 이미지" src={`${PROFILE_CDN}/${profileUrl}`} width={36} height={36} />
      </Button>
      <DropDown isActive={isClick} direction="right" distance={{ desktop: 10, mobile: 8 }}>
        <DropDownUl>
          {menuList.map((menu) => (
            <li
              key={`menu-${menu.id}`}
              onClick={() => {
                handleMenu(menu.value);
              }}
            >
              <p>{menu.text}</p>
            </li>
          ))}
        </DropDownUl>
      </DropDown>
    </Container>
  );
};

export default ProfileButton;
export type ProfileButtonType = { ProfileButton: typeof ProfileButton };
