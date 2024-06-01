'use client';

import HeaderComp from '@/app/components/common/\bHeaderComp';
import SectionComp from '@/app/components/common/SectionComp';
import useAuth from '@/app/hooks/useAuth';
import { getHost } from '@/app/utils/host';
import Image from 'next/image';
import logo_kakao from '../../../assets/images/home/logo_kakao.png';
import styled from 'styled-components';

const ContainerMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 960px;
`;

const TitleP = styled.h1`
  margin: 48px 0 32px;
  background: ${({ theme }) => theme.color.gradient.normal};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  white-space: pre-line;
  text-align: center;
  ${({ theme }) => theme.font.display3};

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.display4};
  }
`;

const TempImageRegionDiv = styled.div`
  height: 266px;
  width: 100%;
  background-color: #e5e5e5;
  border-radius: 12px;
`;

const DescUl = styled.ul`
  display: flex;
  margin-top: 56px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    flex-direction: column;
  }
`;

const DescItemLi = styled.li`
  color: ${({ theme }) => theme.color.label.normal};
  text-align: center;

  &:not(:last-of-type) {
    margin-right: 32px;
  }

  & > p:first-of-type {
    ${({ theme }) => theme.font.heading1};
  }

  & > p:first-of-type > span {
    color: ${({ theme }) => theme.color.primary.normal};
  }

  & > p:last-of-type {
    margin-top: 8px;
    ${({ theme }) => theme.font.body1};
    opacity: 0.5;
    white-space: pre-line;
  }

  /* TODO: 임시 div */
  & > div {
    margin-top: 12px;
    width: 100%;
    height: 140px;
    background-color: #f9f9f9;
    border-radius: 15px;
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    &:not(:last-of-type) {
      margin: 32px 0 0 0;
    }

    & > p:last-of-type {
      ${({ theme }) => theme.font.body2};
    }
  }
`;

const LoginTitleP = styled.p`
  ${({ theme }) => theme.font.title2};
  color: ${({ theme }) => theme.color.label.normal};
  text-align: center;
`;

const KakaoLoginButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 45px;
  margin: 32px auto 0;
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

const SignUpButton = styled.button`
  margin: 12px auto 0;
  background-color: #c3c3c3;
  border-radius: 4px;
  padding: 14px 24px;
  width: 300px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    width: 272px;
  }
`;

const DESC_ITEMS = [
  {
    title: (
      <p>
        <span>소통</span>
        {` 역량 성장`}
      </p>
    ),
    desc: `여러 직군과 자유로운 소통으로 직군 간 이해도를\n높여 소통 역량을 향상시킬 수 있어요.`,
  },
  {
    title: (
      <p>
        <span>간접</span>
        {` 경험`}
      </p>
    ),
    desc: `서로의 협업 경험을 공유하여 여러 사례들을\n간접적으로 경험할 수 있어요.`,
  },
  {
    title: (
      <p>
        {`관점을 `}
        <span>넓힐 수 있는</span>
        {` 기회`}
      </p>
    ),
    desc: `다른 직군과 소통을 통해 서로의 입장을 이해하여\n관점을 넓힐 수 있는 기회를 제공해요.`,
  },
];

export default function Login() {
  // hooks
  const { login } = useAuth();

  const host = getHost();

  // events
  const handleClickKakao = () => {
    login(`${host}/api/auth/callback`);
  };

  const handleClickSignUp = () => {
    login(`${host}/signup`);
  };

  return (
    <ContainerMain>
      <HeaderComp.AuthHeader />
      <SectionComp direction="column" padding="0 20px">
        <TitleP>{`풀리지 않던 궁금증을\n해소하는 곳`}</TitleP>

        <TempImageRegionDiv />

        <DescUl>
          {DESC_ITEMS.map((item, idx) => (
            <DescItemLi key={`desc-item-${idx}`}>
              {item.title}
              <p>{item.desc}</p>
              {/* TODO: 임시 div */}
              <div />
            </DescItemLi>
          ))}
        </DescUl>
      </SectionComp>

      <SectionComp direction="column" padding="64px 20px 166px">
        <LoginTitleP>지금 바로 함께하세요!</LoginTitleP>
        {/* TODO: 디자인 가이드 배포 후, 공용 모듈화 필요 */}
        <KakaoLoginButton onClick={handleClickKakao}>
          <Image alt="" src={logo_kakao} width={18} height={18} />
          카카오 로그인
        </KakaoLoginButton>

        <SignUpButton onClick={handleClickSignUp}>회원가입</SignUpButton>
      </SectionComp>
    </ContainerMain>
  );
}
