'use client';

import styled, { RuleSet, css } from 'styled-components';
import { ButtonProps } from './type';
import { ButtonSizeStyle } from './style';
interface Props extends ButtonProps {}

const SolidButton = styled.button<{ $isActive: boolean; $sizeStyle: RuleSet<object> }>`
  ${({ $sizeStyle }) => $sizeStyle}
  border-radius: 15px;

  ${({ theme, $isActive }) =>
    $isActive
      ? css`
          background-color: ${theme.color.primary.normal};
          color: ${theme.color.static.light};
        `
      : css`
          background-color: ${theme.color.palette.coolNeutral99};
          color: ${theme.color.label.normal};
        `}

  &:hover {
    /* Sementic/Primary/Strong */
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), #00a1ff;
  }

  &:focus {
    /* Sementic/Primary/Heavy */
    background: #0080db;
    filter: rgba(0, 0, 0, 0.1);
  }
`;

const Solid = ({ children, text, isActive, onClick, size, ...props }: Props) => {
  return (
    <SolidButton
      {...props}
      $sizeStyle={ButtonSizeStyle(size ?? 'md')}
      $isActive={isActive}
      onClick={onClick}
    >
      {children || text}
    </SolidButton>
  );
};

export default Solid;
export type SolidType = { Solid: typeof Solid };
