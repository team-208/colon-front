'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';

type Direction = 'column' | 'row';

interface Props {
  direction: Direction;
  children: ReactNode;
  padding?: string;
  margin?: string;
  heightFull?: boolean;
}

const Container = styled.section<{
  $dir: Direction;
  $padding: string;
  $margin: string;
  $hFull: boolean;
}>`
  display: flex;
  height: ${({$hFull}) => $hFull  ? '100%' : 'auto'};
  flex-direction: ${({ $dir }) => $dir};
  padding: ${({ $padding }) => $padding};
  margin: ${({ $margin }) => $margin};

  ${({ theme }) => theme.mediaQuery.tablet} {
    max-width: 960px;
  }
`;

const Section = (props: Props) => {
  const { direction, children, padding, margin, heightFull = false } = props;
  return (
    <Container
      $dir={direction}
      $padding={padding ?? '16px'}
      $margin={margin ?? '0'}
      $hFull={heightFull}
    >
      {children}
    </Container>
  );
};

export default Section;
