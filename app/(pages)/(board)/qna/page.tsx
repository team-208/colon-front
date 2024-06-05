'use client';

import styled from 'styled-components';
import HeaderComp from '@/app/components/common/\bHeaderComp';
import Section from '@/app/components/common/Section';
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
      <Section direction="column" padding="0">
        <TopArea />
        <QnaListComp />
      </Section>
    </ContainerMain>
  );
};

export default QnaPage;
