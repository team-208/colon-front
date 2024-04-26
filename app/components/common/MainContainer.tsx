'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

const Container = styled.main`
  margin-top: ${({ theme }) => theme.heightSizes.header.desktop}px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    margin-top: ${({ theme }) => theme.heightSizes.header.mobile}px;
  }
`;

const MainContainer = (props: Props) => {
  const { children } = props;

  return <Container>{children}</Container>;
};

export default MainContainer;
