'use client';

import useAuth from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const ContainerMain = styled.main`
  margin-top: 50px;
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
  const { push } = useRouter();
  const { login } = useAuth();

  // events
  const handleClickKakao = () => {
    login();
  };

  const handleClickSignUp = () => {
    push('/signup');
  };

  return (
    <ContainerMain>
      <ServiceImageP>소개글</ServiceImageP>

      {/* TODO: 디자인 가이드 배포 후, 공용 모듈화 필요 */}
      <KakaoLoginButton onClick={handleClickKakao}>
        카카오로 로그인하고 소통하러 가기!
      </KakaoLoginButton>

      <SignUpButton onClick={handleClickSignUp}>회원가입</SignUpButton>
    </ContainerMain>
  );
}
