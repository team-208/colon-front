'use client';

import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

type DIRECTION_TYPE = 'left' | 'right';

interface Distance {
  desktop: number;
  mobile: number;
}

interface Props {
  children: ReactNode;
  isActive: boolean;
  direction?: DIRECTION_TYPE;
  distance?: Distance;
  defaultHeight?: number;
}

const DropDownBoxDiv = styled.div<{
  $isActive: boolean;
  $dir: string;
  $dis: Distance;
  $minHeight: number;
}>`
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

  ${({ theme, $isActive, $dir, $dis }) =>
    $isActive &&
    css`
      transform: none;
      ${$dir}: 0;
      top: calc(100% + ${$dis.desktop}px);
      opacity: 1;

      ${theme.mediaQuery.mobile} {
        top: calc(100% + ${$dis.mobile}px);
      }
    `}
`;

const DropDown = ({ children, isActive, direction, distance, defaultHeight }: Props) => {
  return (
    <DropDownBoxDiv
      $isActive={isActive}
      $dir={direction ?? 'left'}
      $dis={distance ?? { desktop: 0, mobile: 0 }}
      $minHeight={defaultHeight ?? 0}
    >
      {children}
    </DropDownBoxDiv>
  );
};

export default DropDown;
