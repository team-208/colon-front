'use client';

import styled from 'styled-components';
import Section from '@/app/components/common/Section';
import MyPageHeader from '@/app/components/mypage/MypageHeader';
import ProfileBox from '@/app/components/mypage/ProfileBox';
import Tabs from '@/app/components/mypage/Tabs';
import DeleteUserButton from '@/app/components/mypage/DeleteUserButton';

const ContainerMain = styled.main`
  // ScrollBox height 처리
  height: ${({ theme }) => `calc(100% - ${theme.heightSizes.header.desktop}px)`};
  padding-left: 200px;
  padding-right: 200px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    height: ${({ theme }) => `calc(100% - ${theme.heightSizes.header.mobile}px)`};
    padding-left: 0;
    padding-right: 0;
  }
`;

const StaticHeightDiv = styled.div`
  height: calc(100% - 136px);

  ${({ theme }) => theme.mediaQuery.mobile} {
    height: calc(100% - 120px);
  }
`;

export default function MyPage() {
  return (
    <ContainerMain>
      <MyPageHeader />
      <Section direction="row" padding="0">
        <ProfileBox />
      </Section>

      <StaticHeightDiv>
        <Tabs />
      </StaticHeightDiv>
      {/* <DeleteUserButton /> */}
    </ContainerMain>
  );
}
