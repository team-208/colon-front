'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';

const Section = styled.div<{ $dir: string }>`
  display: flex;
  flex-direction: ${(props) => props.$dir};
  padding: 16px;
`;

interface Props {
  direction: 'column' | 'row';
  children: ReactNode;
}

const SectionComp = (props: Props) => {
  const { direction, children } = props;
  return <Section $dir={direction}>{children}</Section>;
};

export default SectionComp;
