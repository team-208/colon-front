'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';

const Section = styled.section<{ $dir: Direction }>`
  display: flex;
  flex-direction: ${(props) => props.$dir};
  padding: 16px;
`;

type Direction = 'column' | 'row';

interface Props {
  direction: Direction;
  children: ReactNode;
}

const SectionComp = (props: Props) => {
  const { direction, children } = props;
  return <Section $dir={direction}>{children}</Section>;
};

export default SectionComp;
