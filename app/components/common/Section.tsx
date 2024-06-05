'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';

type Direction = 'column' | 'row';

interface Props {
  direction: Direction;
  children: ReactNode;
  padding?: string;
}

const Container = styled.section<{ $dir: Direction; $padding: string }>`
  display: flex;
  flex-direction: ${({ $dir }) => $dir};
  padding: ${({ $padding }) => $padding};
`;

const Section = (props: Props) => {
  const { direction, children, padding } = props;
  return (
    <Container $dir={direction} $padding={padding ?? '16px'}>
      {children}
    </Container>
  );
};

export default Section;
