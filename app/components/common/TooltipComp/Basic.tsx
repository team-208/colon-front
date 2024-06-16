'use client';

import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

type positionType = 'center' | 'left' | 'right';

interface Props {
  position: positionType;
  children?: ReactNode;
  text?: string;
}

const Container = styled.div<{ $pos: positionType }>`
  position: fixed;
  z-index: 1000;
  bottom: 102px;
  ${({ $pos }) => {
    switch ($pos) {
      case 'center':
        return css`
          left: 50%;
          transform: translateX(-50%);
        `;
      case 'left':
        return css`
          left: 0;
        `;
      case 'right':
        return css`
          right: 0;
        `;
    }
  }};

  ${({ theme }) => theme.mediaQuery.mobile} {
    bottom: 60px;
  }
`;

const TooltipP = styled.p`
  padding: 8px 16px;
  min-width: 183px;
  min-height: 36px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #171719;
  backdrop-filter: blur(2px);
  border-radius: 10px;
  opacity: 0.7;

  ${({ theme }) => theme.font.body2}
  font-weight: 600;
  color: ${({ theme }) => theme.color.static.light};
  text-align: center;

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.body3}
  }
`;

const Basic = ({ position, children, text }: Props) => {
  return <Container $pos={position}>{children || (text && <TooltipP>{text}</TooltipP>)}</Container>;
};

export default Basic;
export type BasicType = { Basic: typeof Basic };
