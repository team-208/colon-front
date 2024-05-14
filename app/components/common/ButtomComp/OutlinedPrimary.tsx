'use client';

import styled from 'styled-components';

interface Props {
  text: string;
  isActive: boolean;
  onClick: () => void;
  size?: 'lg' | 'md' | 'sm';
}

const OutlinedPrimaryButton = styled.button<{ $isActive: boolean; $size: string }>`
  background: transparent;
  border: 1px solid
    ${({ theme, $isActive }) =>
      $isActive ? theme.color.primary.normal : theme.color.interaction.disable};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.color.primary.normal : theme.color.label.disable};

/* TODO: ButtonComp 개발 시 분리 */

${({ theme, $size }) =>
    $size === 'lg' ? theme.font.body1 : $size === 'md' ? theme.font.body2 : theme.font.body3}
  border-radius: ${({ $size }) => ($size === 'lg' ? 15 : $size === 'md' ? 13 : 12)}px;
  padding: ${({ $size }) =>
    $size === 'lg' ? '12px 28px' : $size === 'md' ? '10px 24px' : '8px 20px'};

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.body3}
  }
`;

const OutlinedPrimary = ({ text, isActive, onClick, size, ...props }: Props) => {
  return (
    <OutlinedPrimaryButton {...props} $size={size ?? 'md'} $isActive={isActive} onClick={onClick}>
      {text}
    </OutlinedPrimaryButton>
  );
};

export default OutlinedPrimary;
export type OutlinedPrimaryType = { OutlinedPrimary: typeof OutlinedPrimary };
