import { createElement } from 'react';

import * as svg from './svg';
import styled, { css } from 'styled-components';

export type IconNameType = keyof typeof svg;

export interface IconProps {
  name: IconNameType;
  fixStroke?: boolean;
  strokeWidth?: number;
  rotate?: number;
  width?: string;
  height?: string;
  color?: string;
  fillColor?: string;
  className?: string;
}

const StyledIcon = styled.div<{
  $fixStroke: boolean;
  $strokeWidth: number;
  $rotate: number;
  $width?: string;
  $height?: string;
  $color?: string;
  $fillColor?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    transform: rotate(${({ $rotate }) => $rotate}deg);
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};

    path,
    circle,
    rect {
      stroke: ${({ $color }) => $color};
      fill: ${({ $fillColor }) => $fillColor};

      ${({ $fixStroke, $strokeWidth }) =>
        $fixStroke &&
        css`
          stroke-width: ${$strokeWidth || 1};
          vector-effect: non-scaling-stroke;
        `}
    }
  }
`;

const Icon = ({
  name,
  width,
  height,
  color,
  fixStroke = true,
  strokeWidth = 1,
  rotate = 0,
  fillColor,
  className,
}: IconProps) => (
  <StyledIcon
    $width={width}
    $height={height}
    $color={color}
    $fixStroke={fixStroke}
    $strokeWidth={strokeWidth}
    $rotate={rotate}
    $fillColor={fillColor}
    className={className}
  >
    {createElement(svg[name])}
  </StyledIcon>
);

export default Icon;
