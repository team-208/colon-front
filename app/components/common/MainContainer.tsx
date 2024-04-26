'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  fullWidth?: boolean;
  children: ReactNode;
}

const Container = styled.main<{ $full: boolean }>`
  ${({ $full }) => 'max-width: none;'}
  margin-top: ${({ theme }) => theme.heightSizes.header.desktop}px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    margin-top: ${({ theme }) => theme.heightSizes.header.mobile}px;
  }
`;

const MainContainer = (props: Props) => {
  const { children, fullWidth } = props;

  return <Container $full={fullWidth ?? false}>{children}</Container>;
};

export default MainContainer;
