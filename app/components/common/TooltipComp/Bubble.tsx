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

const topStyle = ({
  $top,
  $left,
  $bottom,
  $right,
}: {
  $top?: string;
  $left?: string;
  $bottom?: string;
  $right?: string;
}) => css`
  top: ${$top ?? '0px'};
  left: ${$left ?? '50%'};
  bottom: ${$bottom ?? 'initial'};
  right: ${$right ?? 'initial'};
  transform: translate(-50%, -100%);
  flex-direction: column;
`;

const leftStyle = ({
  $top,
  $left,
  $bottom,
  $right,
}: {
  $top?: string;
  $left?: string;
  $bottom?: string;
  $right?: string;
}) => css`
  top: ${$top ?? '50%'};
  left: ${$left ?? '0px'};
  bottom: ${$bottom ?? 'initial'};
  right: ${$right ?? 'initial'};
  transform: translate(-100%, -50%);
  flex-direction: row;
`;

const bottomStyle = ({
  $top,
  $left,
  $bottom,
  $right,
}: {
  $top?: string;
  $left?: string;
  $bottom?: string;
  $right?: string;
}) => css`
  top: ${$top ?? 'initial'};
  left: ${$left ?? '50%'};
  bottom: ${$bottom ?? '0px'};
  right: ${$right ?? 'initial'};
  transform: translate(-50%, 100%);
  flex-direction: column;
`;

const rightStyle = ({
  $top,
  $left,
  $bottom,
  $right,
}: {
  $top?: string;
  $left?: string;
  $bottom?: string;
  $right?: string;
}) => css`
  top: ${$top ?? '50%'};
  left: ${$left ?? 'initial'};
  bottom: ${$bottom ?? 'initial'};
  right: ${$right ?? '0px'};
  transform: translate(100%, -50%);
  flex-direction: row;
`;

const ContainerDiv = styled.div<{
  $align: 'top' | 'left' | 'bottom' | 'right';
  $top?: string;
  $left?: string;
  $bottom?: string;
  $right?: string;
}>`
  position: absolute;
  display: flex;
  ${({ $align }) => $align === 'top' && topStyle}
  ${({ $align }) => $align === 'left' && leftStyle}
  ${({ $align }) => $align === 'bottom' && bottomStyle}
  ${({ $align }) => $align === 'right' && rightStyle}
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
