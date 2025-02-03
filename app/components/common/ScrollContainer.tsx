'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  maxHeight?: number;
}

const Container = styled.div<{ $maxHeight: number }>`
  width: 100%;
  height: auto;
  max-height: ${({ $maxHeight }) => $maxHeight}px;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 18px;
    height: 18px;
  }

  /* 스크롤바 막대 설정*/
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.line.solid.neutral};
    border-radius: 10px;
    border: 6px solid rgba(255, 255, 255, 0.9);
  }

  /* 스크롤바 뒷 배경을 투명 처리한다 */
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const ScrollContainer = ({ children, maxHeight }: Props) => {
  return <Container $maxHeight={maxHeight ?? 310}>{children}</Container>;
};

export default ScrollContainer;
