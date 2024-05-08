'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/app/hooks/useAuth';
import styled from 'styled-components';
import logoImg from '../../assets/images/logo.png';
import icon_bell from '../../assets/images/header/icon_bell.png';
import icon_search from '../../assets/images/header/icon_search.png';
import { headerMenu } from '@/app/constants/menu';
import { PROFILE_CDN } from '@/app/constants/externalUrls';

interface ScrollEvent extends EventTarget {
  tagName: string;
  scrollTop: number;
}

const ContainerHeader = styled.header<{ $isScroll: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ theme }) => theme.heightSizes.header.desktop}px;
  ${({ $isScroll }) =>
    $isScroll
      ? 'backdrop-filter: blur(5px);-webkit-backdrop-filter: blur(5px);'
      : 'border-bottom: 1px solid #cbcbcb;'}
  background-color: ${({ theme, $isScroll }) =>
    $isScroll ? 'rgba(255,255,255,.3)' : theme.color.static.light};

  z-index: 1000;

  ${({ theme }) => theme.mediaQuery.mobile} {
    height: ${({ theme }) => theme.heightSizes.header.mobile}px;
  }
`;

const ContainerHeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: inherit;
  padding: 0 190px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 0 20px;
  }
`;

const LogoContainer = styled.div`
  position: relative;
  width: 80px;
  height: 18px;
  margin-right: 24px;
`;

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  :not(:last-of-type) {
    margin-right: 10px;
  }
`;

const HeaderNav = styled.nav`
  li {
    display: inline-flex;
    height: inherit;
    ${({ theme }) => theme.font.body3}

    a {
      color: ${({ theme }) => theme.color.label.normal};
    }

    &:not(:last-of-type) {
      margin-right: 10px;
    }
  }
`;

const ProfileContainerDiv = styled.div`
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 12px;
  background: rgba(55, 56, 60, 0.1);
`;

const HeaderComp = () => {
  // TODO: 로그인 확인용 임시 로직
  const [isScroll, setIsScroll] = useState(false);
  const { userInfo } = useAuth();
  const { push } = useRouter();

  const profileUrl = useMemo(() => {
    return userInfo?.user?.profile_url || '/default.png';
  }, [userInfo?.user]);

  useEffect(() => {
    window.addEventListener(
      'scroll',
      (e) => {
        const target = e.target as ScrollEvent;
        if (target.tagName === 'MAIN') {
          if (target.scrollTop === 0) setIsScroll(false);
          if (target.scrollTop > 0) setIsScroll(true);
        }
      },
      true,
    );
  }, []);

  return (
    <ContainerHeader $isScroll={isScroll}>
      <ContainerHeaderInner>
        <FlexRowDiv>
          <Link href="/">
            <LogoContainer>
              <Image alt="" src={logoImg} sizes="80px" fill />
            </LogoContainer>
          </Link>
          <HeaderNav>
            <ul>
              {headerMenu.map((v) => (
                <li key={v.id}>
                  <Link href={v.route}>{v.text}</Link>
                </li>
              ))}
            </ul>
          </HeaderNav>
        </FlexRowDiv>

        {userInfo && (
          <FlexRowDiv>
            <Image alt="" src={icon_search} width={24} height={24} />
            <Image alt="" src={icon_bell} width={24} height={24} />
            <ProfileContainerDiv onClick={() => push('/mypage')}>
              <Image
                alt="프로필 이미지"
                src={`${PROFILE_CDN}/${profileUrl}`}
                width={36}
                height={36}
              />
            </ProfileContainerDiv>
          </FlexRowDiv>
        )}
      </ContainerHeaderInner>
    </ContainerHeader>
  );
};

export default HeaderComp;
