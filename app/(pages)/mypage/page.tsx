'use client';

import styled from 'styled-components';
import HeaderComp from '@/app/components/common/\bHeaderComp';
import SectionComp from '@/app/components/common/SectionComp';
import ProfileComp from '@/app/components/mypage/ProfileComp';
import TabsComp from '@/app/components/mypage/TabsComp';
import DeleteUserButton from '@/app/components/mypage/DeleteUserButton';

const ContainerMain = styled.main`
  padding-left: 200px;
  padding-right: 200px;

  ${({ theme }) => theme.mediaQuery.mobile} {
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
      <HeaderComp.BasicHeader />
      <SectionComp direction="row" padding="0">
        <ProfileComp />
      </SectionComp>

      <StaticHeightDiv>
        <TabsComp />
      </StaticHeightDiv>

      {/* <DeleteUserButton /> */}
    </ContainerMain>
  );
}
