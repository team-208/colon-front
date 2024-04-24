'use client';

import Image from 'next/image';
import Link from 'next/link';
import useAuth from '@/app/hooks/useAuth';
import styled from 'styled-components';
import logoImg from '../../assets/images/logo.png';
import icon_bell from '../../assets/images/header/Bell.png';
import icon_search from '../../assets/images/header/Search.png';
import { headerMenu } from '@/app/constants/menu';

const ContainerHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.color.static.light};
  border-bottom: 1px solid #cbcbcb;

  ${({ theme }) => theme.mediaQuery.mobile} {
    height: 56px;
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

  &.gap {
    :not(:last-child) {
      margin-right: 10px;
    }
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

    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`;

const HeaderComp = () => {
  // TODO: 로그인 확인용 임시 로직
  const { userInfo } = useAuth();

  return (
    <ContainerHeader>
      <ContainerHeaderInner>
        <FlexRowDiv>
          <LogoContainer>
            <Link href="/">
              <Image alt="" src={logoImg} fill />
            </Link>
          </LogoContainer>
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
          <FlexRowDiv className="gap">
            <Image alt="" src={icon_search} width={24} height={24} />
            <Image alt="" src={icon_bell} width={24} height={24} />
            {/* TODO: profile_url 처리 */}
            <h1>{userInfo?.user?.nick_name ?? ''}</h1>
          </FlexRowDiv>
        )}
      </ContainerHeaderInner>
    </ContainerHeader>
  );
};

export default HeaderComp;
