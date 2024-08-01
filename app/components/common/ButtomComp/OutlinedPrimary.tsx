'use client';

import styled, { RuleSet, css } from 'styled-components';
import { ButtonProps } from './type';
import { ButtonSizeStyle } from './style';

interface Props extends ButtonProps {
}

const OutlinedPrimaryButton = styled.button<{
  $isActive: boolean;
  $hoverEffect: boolean;
  $focusEffect: boolean;
  $sizeStyle: RuleSet<object>;
}>`
  ${({ $sizeStyle }) => $sizeStyle}
  background: transparent;

  ${({ theme, $isActive }) =>
    $isActive
      ? css`
          border: 1px solid ${theme.color.primary.normal};
          color: ${theme.color.primary.normal};
        `
      : css`
          border: 1px solid ${theme.color.interaction.disable};
          color: ${theme.color.interaction.disable};
        `}

  ${({ $hoverEffect }) =>
    $hoverEffect &&
    css`
      &:hover {
        background: rgba(0, 161, 255, 0.04);
      }
    `}


    ${({ $focusEffect }) =>
    $focusEffect &&
    css`
      &:focus {
        background: rgba(0, 161, 255, 0.1);
      }
    `}
`;

const OutlinedPrimary = ({
  children,
  text,
  isActive,
  hoverEffect = true,
  focusEffect = true,
  onClick,
  size,
  ...props
}: Props) => {
  return (
    <OutlinedPrimaryButton
      {...props}
      $sizeStyle={ButtonSizeStyle(size ?? 'md')}
      $isActive={isActive}
      $hoverEffect={hoverEffect}
      $focusEffect={focusEffect}
      onClick={onClick}
    >
      {children || text}
    </OutlinedPrimaryButton>
  );
};

export default OutlinedPrimary;
export type OutlinedPrimaryType = { OutlinedPrimary: typeof OutlinedPrimary };
