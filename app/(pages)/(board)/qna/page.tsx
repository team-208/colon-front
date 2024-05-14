'use client';

import styled from 'styled-components';
import SectionComp from '@/app/components/common/SectionComp';
import TopArea from '@/app/components/board/qna/TopArea';
import QnaListComp from '@/app/components/board/qna/QnaListComp';

const ContainerMain = styled.main`
  padding: 0 180px;
  ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 0;
  }
`;

const QnaPage = () => {
  return (
    <ContainerMain>
      <SectionComp direction="column" padding="0">
        <TopArea />
        <QnaListComp />
      </SectionComp>
    </ContainerMain>
  );
};

export default QnaPage;
