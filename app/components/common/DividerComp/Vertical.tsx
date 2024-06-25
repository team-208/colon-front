'use client';

import styled from 'styled-components';

interface Props {
  className?: string;
  width?: number;
  height: number;
  color?: string;
}

const ContainerDiv = styled.div<{ $width?: number; $height: number; $color?: string }>`
  width: ${({ $width }) => $width || 1}px;
  height: ${({ $height }) => $height}px;
  background-color: ${({ $color, theme }) => $color ?? theme.color.line.solid.neutral};
`;

const Vertical = ({ className, width, height, color }: Props) => (
  <ContainerDiv className={className} $width={width} $height={height} $color={color} />
);

export default Vertical;
export type VerticalType = { Vertical: typeof Vertical };
