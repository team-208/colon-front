'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
}

const Container = styled.div`
  position: relative;
`;

const GradientBox = styled(motion.div)`
  position: absolute;
  top: 0%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    104deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 49.922578828828826%,
    rgba(171, 171, 171, 0) 100%
  );
`;

const AnimatonBox = ({ children }: Props) => {
  return (
    <Container>
      <GradientBox
        layout
        animate={{
          left: ['-70%', '10%', '90%', '170%', '-170%'],
        }}
        transition={{
          easings: ['easeIn', 'linear', 'linear', [0, 0, 0.3, 0.9]],
          duration: 1.2,
          repeat: Infinity,
        }}
      />
      {children}
    </Container>
  );
};

export default AnimatonBox;
