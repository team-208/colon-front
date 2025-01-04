'use client';

import React from 'react';
import styled from 'styled-components';
import SearchHeader from '@/app/components/common/SearchHeader';
import QnaSerachList from '@/app/components/board/qna/search/QnaSearchList';
import Section from '@/app/components/common/Section';

const ContainerMain = styled.main`
  padding-left: 180px;
  padding-right: 180px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    padding-left: 0;
    padding-right: 0;
  }
`;

const QuestionSearchPage = () => {
  return (
    <ContainerMain>
      <SearchHeader />
      <Section direction="column" padding="0" heightFull>
        <QnaSerachList />
      </Section>
    </ContainerMain>
  );
};

export default QuestionSearchPage;
