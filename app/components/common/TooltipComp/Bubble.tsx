'use client';

import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import Icon from '../Icon/Icon';
import theme from '@/app/styles/theme';

interface Position {
  align: 'top' | 'left' | 'bottom' | 'right';
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
}

interface Props {
  bubblePosition: Position;
  bubbleColor?: string;
  children: ReactNode;
}

const ContainerDiv = styled.div<{
  $align: 'top' | 'left' | 'bottom' | 'right';
  $top?: string;
  $left?: string;
  $bottom?: string;
  $right?: string;
}>`
  position: absolute;
  top: ${({ $top }) => $top ?? 'initial'};
  left: ${({ $left }) => $left ?? 'initial'};
  bottom: ${({ $bottom }) => $bottom ?? 'initial'};
  right: ${({ $right }) => $right ?? 'initial'};

  display: flex;
  flex-direction: ${({ $align }) => ($align === 'top' || $align === 'bottom' ? 'column' : 'row')};
`;

const ContentWrapperDiv = styled.div<{ $backgroundColor?: string }>`
  display: flex;
  background-color: ${({ theme, $backgroundColor }) => $backgroundColor ?? theme.color.static.dark};
  border-radius: 10px;
  padding: 8px 16px 10px;
`;

const BubbleIcon = styled(Icon)`
  margin: -1px;
`;

const ContentP = styled.p`
  ${({ theme }) => theme.font.body3};
  color: ${({ theme }) => theme.color.static.light};
  white-space: nowrap;
`;

const Bubble = ({ bubblePosition, children, bubbleColor }: Props) => {
  const { align, top, left, bottom, right } = bubblePosition;
  return (
    <ContainerDiv $align={align} $top={top} $left={left} $bottom={bottom} $right={right}>
      {(align === 'right' || align === 'bottom') && (
        <BubbleIcon
          name="icBubble"
          width="12px"
          height="10px"
          rotate={align === 'right' ? 90 : -180}
          fillColor={bubbleColor ?? theme.color.static.dark}
        />
      )}
      <ContentWrapperDiv $backgroundColor={bubbleColor}>
        {typeof children === 'string' ? <ContentP>{children}</ContentP> : children}
      </ContentWrapperDiv>
      {(align === 'left' || align === 'top') && (
        <BubbleIcon
          name="icBubble"
          width="12px"
          height="10px"
          rotate={align === 'left' ? -90 : 0}
          fillColor={bubbleColor ?? theme.color.static.dark}
        />
      )}
    </ContainerDiv>
  );
};

export default Bubble;
export type BubbleType = { Bubble: typeof Bubble };
