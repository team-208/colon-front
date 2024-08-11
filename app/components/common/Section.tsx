'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';

type Direction = 'column' | 'row';

interface Props {
  direction: Direction;
  children: ReactNode;
  padding?: string;
  margin?: string;
}

const Container = styled.section<{ $dir: Direction; $padding: string; $margin: string }>`
  display: flex;
  flex-direction: ${({ $dir }) => $dir};
  padding: ${({ $padding }) => $padding};
  margin: ${({ $margin }) => $margin};
`;

const Section = (props: Props) => {
  const { direction, children, padding, margin } = props;
  return (
    <Container $dir={direction} $padding={padding ?? '16px'} $margin={margin ?? '0'}>
      {children}
    </Container>
  );
};

export default Section;
