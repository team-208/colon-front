'use client';

import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { scrollState } from '@/app/recoils';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

const ContainerDiv = styled.header<{ $isScroll: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ theme }) => theme.heightSizes.header.desktop}px;
  ${({ $isScroll }) =>
    $isScroll
      ? 'backdrop-filter: blur(5px);-webkit-backdrop-filter: blur(5px);'
      : 'border-bottom: 1px solid #cbcbcb;'}
  background-color: ${({ theme, $isScroll }) =>
    $isScroll ? 'rgba(255,255,255,.3)' : theme.color.static.light};
  padding: 0 190px;
  z-index: 1000;

  ${({ theme }) => theme.mediaQuery.mobile} {
    height: ${({ theme }) => theme.heightSizes.header.mobile}px;
    padding: 0 20px;
  }
`;

const Container = ({ children, ...props }: Props) => {
  const isScroll = useRecoilValue(scrollState);

  return (
    <ContainerDiv {...props} $isScroll={isScroll}>
      {children}
    </ContainerDiv>
  );
};

export default Container;
export type ContainerType = { Container: typeof Container };
