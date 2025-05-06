'use client';

import BasicHeader from '@/app/components/common/BasicHeader';
import Section from '@/app/components/common/Section';
import useAuth from '@/app/hooks/useAuth';
import { getHost } from '@/app/utils/host';
import Image from 'next/image';
import logo_kakao from '../../../assets/images/home/logo_kakao.png';
import styled from 'styled-components';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const ContainerMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 960px;
`;

const TitleImageBoxDiv = styled.div`
  position: absolute;
  left: 50%;
  top: ${({ theme }) => theme.heightSizes.header.desktop}px;
  background: linear-gradient(360deg, #78ceff 2.14%, #e2f4ff 81.03%);
  width: 100vw;
  height: 350px;
  transform: translateX(-50%);

  & > div {
    max-width: 1536px;
    margin: 0 auto;
    position: relative;
    width: 100%;
    height: inherit;
    overflow: hidden;
  }
`;

const TitleImage1 = styled(Image)`
  position: absolute;
  top: -280px;
  left: -11px;
`;
const TitleImage2 = styled(Image)`
  position: absolute;
  top: 223px;
  left: 292px;
  transform: rotate(107deg);
`;
const TitleImage3 = styled(Image)`
  position: absolute;
  top: -25px;
  right: 50px;
  transform: rotate(240deg);
`;

const TitleWrapperDiv = styled.div`
  z-index: 1;
`;

const TitleP = styled.h1`
  color: ${({ theme }) => theme.color.label.normal};
  ${({ theme }) => theme.font.display4};

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.display4};
  }
`;

const TitleDescP = styled.p`
  ${({ theme }) => theme.font.heading2};
  font-weight: 400;
  margin-top: 16px;
  white-space: pre-wrap;
  text-align: center;
`;

const DescUl = styled.ul`
  display: flex;
  margin-top: 56px;
  padding: 0 8px;
  width: 100vw;
  height: 18vw;
  cursor: pointer;

  ${({ theme }) => theme.mediaQuery.tablet} {
    padding: 0 40px;
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 0 20px;
    flex-direction: column;
    height: auto;
  }
`;

const DescItemLi = styled.li`
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  color: ${({ theme }) => theme.color.label.normal};
  text-align: center;

  &:not(:last-of-type) {
    margin-right: 32px;
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    &:not(:last-of-type) {
      margin-right: 0;
    }

    &:not(:first-of-type) {
      margin: 32px 0 0 0;
    }

    & > p:last-of-type {
      ${({ theme }) => theme.font.body2};
    }
  }
`;

const ImageBoxDiv = styled.div`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  width: 340px;
  height: 230px;

  ${({ theme }) => theme.mediaQuery.tablet} {
    width: 32vw;
    height: 18vw;
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    width: 100vw;
    height: 60vw;
  }
`;

const DescBoxDiv = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > p {
    ${({ theme }) => theme.font.title2};
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & :hover {
    backdrop-filter: blur(5px);
    background-color: ${({ theme }) => `${theme.color.static.dark}4f`};
    color: ${({ theme }) => theme.color.static.light};
  }
`;

const KakaoLoginButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 45px;
  margin: 46px auto 0;
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

const DescTitleP = styled.p`
  ${({ theme }) => theme.font.title2};
  color: ${({ theme }) => theme.color.label.normal};
  text-align: center;
`;

const DESC_ITEMS = [
  {
    title: '소통 역량 성장',
    desc: `여러 직군과 자유로운 소통으로 직군 간 이해도를\n높여 소통 역량을 향상시킬 수 있어요.`,
  },
  {
    title: '간접 경험',
    desc: `서로의 협업 경험을 공유하여 여러 사례들을\n간접적으로 경험할 수 있어요.`,
  },
  {
    title: '관점을 넓힐 수 있는 기회',
    desc: `다른 직군과 소통을 통해 서로의 입장을 이해하여\n관점을 넓힐 수 있는 기회를 제공해요.`,
  },
];

export default function Login() {
  // hooks
  const { login } = useAuth();
  const searchParams = useSearchParams();

  const host = getHost();

  // events
  const handleClickKakao = () => {
    login(`${host}/api/auth/callback`);
  };

  useEffect(() => {
    const isReportedUser = searchParams.get('isReported') === 'true';
    if (isReportedUser) {
      window.alert('정지된 계정입니다. 일정 기간 후 정지가 풀릴 예정입니다.');
    }
  }, [searchParams]);

  return (
    <ContainerMain>
      <BasicHeader />
      <Section direction="column" padding="84px 0 58px">
        <TitleImageBoxDiv>
          <div>
            <TitleImage1
              alt="상단 이미지1"
              src={`${IMAGE_CDN}/login/login-bg-1-240814.png`}
              width={540}
              height={540}
            />
            <TitleImage2
              alt="상단 이미지2"
              src={`${IMAGE_CDN}/login/login-bg-2-240814.png`}
              width={205}
              height={205}
            />
            <TitleImage3
              alt="상단 이미지3"
              src={`${IMAGE_CDN}/login/login-bg-3-240814.png`}
              width={400}
              height={400}
            />
          </div>
        </TitleImageBoxDiv>

        <TitleWrapperDiv>
          <TitleP>{`풀리지 않던 궁금증을 해소하는 곳`}</TitleP>
          <TitleDescP>{`협업이 중요한 IT 직군이지만, 실무 경험이 없어서 고민이라면?\nCO:LON에서 편하게 물어보세요.`}</TitleDescP>

          <KakaoLoginButton onClick={handleClickKakao}>
            <Image alt="" src={logo_kakao} width={18} height={18} />
            카카오 로그인
          </KakaoLoginButton>
        </TitleWrapperDiv>
      </Section>

      <Section direction="column" padding="76px 20px 143px">
        <DescTitleP>CO:LON에서 얻을 수 있는 것들</DescTitleP>

        <DescUl>
          {DESC_ITEMS.map((item, idx) => (
            <DescItemLi key={`desc-item-${idx}`}>
              <ImageBoxDiv>
                <Image alt="" src={`${IMAGE_CDN}/login/login-desc-${idx + 1}.png`} fill />
              </ImageBoxDiv>

              <DescBoxDiv>
                <p>{item.title}</p>

                {/* <p>{item.desc}</p> */}
              </DescBoxDiv>
            </DescItemLi>
          ))}
        </DescUl>
      </Section>
    </ContainerMain>
  );
}
