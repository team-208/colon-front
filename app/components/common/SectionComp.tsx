'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';

const Section = styled.section<{ $dir: Direction; $padding: string }>`
  display: flex;
  flex-direction: ${(props) => props.$dir};
  padding: ${({ $padding }) => $padding};
`;

type Direction = 'column' | 'row';

interface Props {
  direction: Direction;
  children: ReactNode;
  padding?: string;
}

const SectionComp = (props: Props) => {
  const { direction, children, padding } = props;
  return (
    <Section $dir={direction} $padding={padding ?? '16px'}>
      {children}
    </Section>
  );
};

export default SectionComp;
