'use client';

import styled, { keyframes } from 'styled-components';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const animation = keyframes`
  0% {
    left: -70%;
    animation: ease-in;
  }
  12% {
    left: -70%;
  }
  25% {
    left: 10%;
    animation: linear;
  }
  50% {
    left: 90%; 
    animation: linear;
  }
  75% {
    left: 170%;
    animation: linear;
  }
  100% {
    left: -70%;
    animation: ease-out;
  }
`;

const Container = styled.div`
  position: relative;
`;

const GradientBox = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    104deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 49.922578828828826%,
    rgba(171, 171, 171, 0) 100%
  );
  animation: ${animation} 1.2s linear infinite;
`;

const AnimatonBox = ({ children }: Props) => {
  return (
    <Container>
      <GradientBox />
      {children}
    </Container>
  );
};

export default AnimatonBox;
