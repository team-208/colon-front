'use client';

import useAuth from '@/app/hooks/useAuth';
import { getHost } from '@/app/utils/host';
import styled from 'styled-components';
import MainContainer from '@/app/components/common/MainContainer';

const ContainerInnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ServiceImageP = styled.p`
  width: 100%;
  line-height: 400px;
  background-color: #e0e0e0;
  text-align: center;
`;

const KakaoLoginButton = styled.button`
  margin: 30px auto 12px;
  background-color: #ffde09;
  border-radius: 4px;
  padding: 14px 24px;
  min-width: 240px;
`;

const SignUpButton = styled.button`
  margin: 0 auto;
  background-color: #c3c3c3;
  border-radius: 4px;
  padding: 14px 24px;
  min-width: 240px;
`;

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
    <MainContainer>
      <ContainerInnerDiv>
        <ServiceImageP>소개글</ServiceImageP>

        {/* TODO: 디자인 가이드 배포 후, 공용 모듈화 필요 */}
        <KakaoLoginButton onClick={handleClickKakao}>
          카카오로 로그인하고 소통하러 가기!
        </KakaoLoginButton>

        <SignUpButton onClick={handleClickSignUp}>회원가입</SignUpButton>
      </ContainerInnerDiv>
    </MainContainer>
  );
}
