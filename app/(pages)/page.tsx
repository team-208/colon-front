'use client';

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
  margin: 0 auto;
  background-color: #ffde09;
  border-radius: 4px;
  padding: 14px 24px;
`;

export default function Home() {
  // hooks
  const { push } = useRouter();

  // events
  const handleClick = () => {
    // TODO: publishing 예정.
    push('/login');
  };

  return (
    <ContainerMain>
      <ServiceImageP>서비스 이미지</ServiceImageP>

      <IntroduceDiv>
        <h2>
          <TitleStrong>CO:LON</TitleStrong>
        </h2>

        <DescP>{`IT 기획자 개발자 디자이너가\n모두 모여 소통하는 공간`}</DescP>
      </IntroduceDiv>

      <KakaoLoginButton onClick={handleClick}>카카오로 로그인하고 소통하러 가기!</KakaoLoginButton>
    </ContainerMain>
  );
}
