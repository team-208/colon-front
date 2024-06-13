'use client';

import styled, { css } from 'styled-components';

type positionType = 'center' | 'left' | 'right';

interface Props {
  position: positionType;
  text: string;
}

const TooltipP = styled.p<{ $pos: positionType }>`
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

  padding: 8px 16px;
  width: 183px;
  height: 36px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #171719;
  backdrop-filter: blur(2px);
  border-radius: 10px;
  opacity: 0.7;

  ${({ theme }) => theme.font.body2}
  font-weight: 600;
  color: ${({ theme }) => theme.color.static.light};

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.body3}
    bottom: 60px;
  }
`;

const Basic = ({ position, text }: Props) => {
  return <TooltipP $pos={position}>{text}</TooltipP>;
};

export default Basic;
export type BasicType = { Basic: typeof Basic };
