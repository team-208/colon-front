'use client';

import styled from 'styled-components';
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

export default function MyPage() {
  return (
    <ContainerMain>
      <SectionComp direction="row" padding="0">
        <ProfileComp />
      </SectionComp>

      <SectionComp direction="column" padding="0">
        <TabsComp />
      </SectionComp>

      <DeleteUserButton />
    </ContainerMain>
  );
}
