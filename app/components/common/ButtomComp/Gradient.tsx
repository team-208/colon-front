'use client';

import styled, {RuleSet, css} from 'styled-components';
import { ButtonProps } from './type';
import { ButtonSizeStyle } from './style';

interface Props extends ButtonProps {
}

const GradientButton = styled.button<{ $isActive: boolean; $sizeStyle: RuleSet<object> }>`
  ${({$sizeStyle}) => $sizeStyle}
  background: ${({ theme }) => theme.color.gradient.normal};
  border: 1px solid rgba(255, 255, 255, 0.5);

  ${({ theme, $isActive }) =>
    $isActive
      ? css`
          color: ${theme.color.static.light};
        `
      : css`
          background: ${theme.color.interaction.disable};
          color: ${theme.color.label.disable};
        `}
`;

const Gradient = ({ children, text, isActive, onClick, size, ...props }: Props) => {
  return (
    <GradientButton
      {...props}
      $sizeStyle={ButtonSizeStyle(size ?? 'md')}
      $isActive={isActive}
      onClick={onClick}
    >
      {children || text}
    </GradientButton>
  );
};

export default Gradient;
export type GradientType = { Gradient: typeof Gradient };
