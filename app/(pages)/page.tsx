'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import SectionComp from '../components/common/SectionComp';
import HeaderComp from '../components/common/\bHeaderComp';
import icon_arrow from '../assets/images/home/icon_arrow.png';
import logo_kakao from '../assets/images/home/logo_kakao.png';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import { isEmpty } from 'lodash';

const ContainerInnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  overflow-x: hidden;
`;

const SquareP = styled.p`
  width: 56px;
  height: 56px;
  margin-bottom: 34px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.primary.normal};
  opacity: 0.3;
  align-self: center;

  ${({ theme }) => theme.mediaQuery.mobile} {
    width: 48px;
    height: 48px;
    margin-bottom: 24px;
  }
`;

const DescP1 = styled.p`
  ${({ theme }) => theme.font.display1}
  text-align: center;

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.display3}
  }
`;
const DescP2 = styled.p`
  ${({ theme }) => theme.font.display2}
  text-align: center;
  margin-bottom: 16px;

  span {
    color: ${({ theme }) => theme.color.primary.normal};

    &:nth-child(2n-1) {
      opacity: 0.3;
    }
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    margin-bottom: 10px;
    ${({ theme }) => theme.font.display4}
  }
`;

const BoxInnerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 54px 0 42px 0;

  > :not(:last-of-type) {
    margin-right: 28px;
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 64px 0 30px 0;
  }
`;

const BoxDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 336px;
  height: 168px;
  background-color: #f5f5f5;
  border-radius: 7px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    width: 200px;
    height: 102px;
  }
`;

const ImgContainerDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    margin-bottom: 30px;
  }
`;

const KakaoLoginButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 45px;
  margin: 0 auto;
  background-color: #ffde09;
  border-radius: 6px;
  font-size: 15px;

  img {
    margin-right: 8px;
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    width: 272px;
  }
`;

export default function Home() {
  // hooks
  const { push, replace } = useRouter();
  const { userInfo, isFetchedUserInfo } = useAuth();

  // events
  const handleClick = () => {
    push('/login');
  };

  useEffect(() => {
    if (!isEmpty(userInfo)) {
      replace('/qna');
    }
  }, [userInfo]);

  if (!isFetchedUserInfo) {
    return <></>;
  }

  return (
    <main style={{ maxWidth: 'none' }}>
      <HeaderComp.BasicHeader/>
      <ContainerInnerDiv>
        <SectionComp direction="column" padding="0">
          <SquareP />
          <DescP2>
            <span>기획자</span> <span>개발자</span> <span>디자이너</span>가
          </DescP2>
          <DescP1>
            모두 모여
            <br />
            소통하는 공간
          </DescP1>
        </SectionComp>

        <SectionComp direction="column" padding="0">
          {/* TODO: publishing 예정. */}
          <BoxInnerDiv>
            {[1, 2, 3, 4, 5].map((v) => (
              <BoxDiv key={v}>
                <p>그래픽 + 커뮤니티 소통 예시</p>
              </BoxDiv>
            ))}
          </BoxInnerDiv>
        </SectionComp>

        <SectionComp direction="column" padding="0">
          <ImgContainerDiv>
            <Image alt="" src={icon_arrow} width={14} height={14} />
          </ImgContainerDiv>
          <KakaoLoginButton onClick={handleClick}>
            <Image alt="" src={logo_kakao} width={18} height={18} />
            카카오 로그인
          </KakaoLoginButton>
        </SectionComp>
      </ContainerInnerDiv>
    </main>
  );
}
