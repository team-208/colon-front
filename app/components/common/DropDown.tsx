'use client';

import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  children?: ReactNode;
  isActive: boolean;
  defaultHeight?: number;
}

const DropDownBoxDiv = styled.div<{ $isActive: boolean; $minHeight: number }>`
  opacity: 0;
  width: fit-content;
  height: fit-content;
  min-height: ${({ $minHeight }) => $minHeight}px;
  position: absolute;
  transform: translate(-200%, -200%);
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid ${({ theme }) => theme.color.line.solid.neutral};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 12px;

  ${({ $isActive }) =>
    $isActive &&
    css`
      transform: none;
      top: 100%;
      opacity: 1;
    `}
`;

const DropDown = ({ children, isActive, defaultHeight }: Props) => {
  return (
    <DropDownBoxDiv $isActive={isActive} $minHeight={defaultHeight ?? 0}>
      {children}
    </DropDownBoxDiv>
  );
};

export default DropDown;
