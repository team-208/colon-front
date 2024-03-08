'use client';

import { Metadata, ResolvingMetadata } from 'next';
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

const IntroduceDiv = styled.div`
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleStrong = styled.strong`
  font-size: 40px;
`;

const DescP = styled.p`
  margin-top: 24px;
  font-size: 20px;
  line-height: 28px;
  white-space: pre-wrap;
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

  // events
  const handleClickKakao = () => {
    // TODO: supabase 연동필요.
    // TODO: 로그인 성공 / 실패 / 미가입자인 경우 각 케이스별 페이지 분기 필요.
    push('/');
  };

  const handleClickSignUp = () => {
    // TODO: publishing 예정.
    push('/singup');
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
