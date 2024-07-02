'use client';

import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

type render = 'visible' | 'hidden';

interface Props {
  children: ReactNode;
  renderMode: render;
  isApply?: boolean;
}

const Container = styled.div<{ $renderMode: render }>`
  ${({ theme, $renderMode }) => {
    switch ($renderMode) {
      case 'visible':
        return css`
          display: none;

          ${theme.mediaQuery.mobile} {
            display: block;
          }
        `;
      case 'hidden':
        return css`
          display: block;

          ${theme.mediaQuery.mobile} {
            display: none;
          }
        `;
    }
  }}
`;

/**
 * @param renderMode visible (모바일 화면에서 표시하기) / hidden (모바일 화면에서 숨기기)
 * @param isApply 조건에 따라 MobileRendroBox 적용 여부 boolean값 props (기본값 true)
 * */
const MobileRenderBox = ({ children, renderMode, isApply = true }: Props) => {
  return isApply ? <Container $renderMode={renderMode}>{children}</Container> : <>{children}</>;
};

export default MobileRenderBox;
