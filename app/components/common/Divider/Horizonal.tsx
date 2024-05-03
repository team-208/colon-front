'use client';

import styled from 'styled-components';

interface Props {
  className?: string;
  height: number;
  color?: string;
}

const ContainerDiv = styled.div<{ $height: number; $color?: string }>`
  width: 100vw;
  height: ${({ $height }) => $height}px;
  background-color: ${({ $color, theme }) => $color ?? theme.color.line.solid.neutral};
`;

const Horizonal = ({ className, height, color }: Props) => (
  <ContainerDiv className={className} $height={height} $color={color} />
);

export default Horizonal;
export type HorizonalType = { Horizonal: typeof Horizonal };
