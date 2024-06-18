'use client';

import styled, {RuleSet, css} from 'styled-components';
import { ButtonProps } from './type';
import { ButtonSizeStyle } from './style';
interface Props extends ButtonProps{
}

const SolidButton = styled.button<{ $isActive: boolean; $sizeStyle: RuleSet<object> }>`
  border-radius: 15px;

  ${({ theme, $isActive }) =>
    $isActive
      ? css`
          background-color: 1px solid ${theme.color.primary.normal};
          color: ${theme.color.static.light};
        `
      : css`
          background-color: 1px solid ${theme.color.palette.coolNeutral99};
          color: ${theme.color.label.normal};
        `}
`;

const Solid = ({ text, isActive, onClick, size, ...props }: Props) => {
  return (
    <SolidButton
      {...props}
      $sizeStyle={ButtonSizeStyle(size ?? 'md')}
      $isActive={isActive}
      onClick={onClick}
    >
      {text}
    </SolidButton>
  );
};

export default Solid;
export type SolidType = { Solid: typeof Solid };
