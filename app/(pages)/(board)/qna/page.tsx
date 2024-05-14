'use client';

import styled from 'styled-components';
import SectionComp from '@/app/components/common/SectionComp';
import TopArea from '@/app/components/board/qna/TopArea';

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
      </SectionComp>
    </ContainerMain>
  );
};

export default QnaPage;
