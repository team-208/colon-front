'use client';

import styled from 'styled-components';
import HeaderComp from '@/app/components/common/\bHeaderComp';
import SectionComp from '@/app/components/common/SectionComp';
import TopArea from '@/app/components/board/qna/TopArea';
import QnaListComp from '@/app/components/board/qna/QnaListComp';

const ContainerMain = styled.main`
  padding-left: 180px;
  padding-right: 180px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    padding-left: 0;
    padding-right: 0;
  }
`;

const QnaPage = () => {
  return (
    <ContainerMain>
      <HeaderComp.SearchHeader />
      <SectionComp direction="column" padding="0">
        <TopArea />
        <QnaListComp />
      </SectionComp>
    </ContainerMain>
  );
};

export default QnaPage;
