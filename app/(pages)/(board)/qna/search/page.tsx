'use client';

import React from 'react';
import styled from 'styled-components';
import SearchHeader from '@/app/components/common/SearchHeader';
import QnaSearchList from '@/app/components/board/qna/search/QnaSearchList';
import Section from '@/app/components/common/Section';

const ContainerMain = styled.main`
  padding-left: 180px;
  padding-right: 180px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    padding-left: 0;
    padding-right: 0;
  }
`;

const StyledSection = styled(Section)`
  height: 100%;
`;

const QuestionSearchPage = () => {
  return (
    <ContainerMain>
      <SearchHeader />
      <StyledSection direction="column" padding="0">
        <QnaSearchList />
      </StyledSection>
    </ContainerMain>
  );
};

export default QuestionSearchPage;
