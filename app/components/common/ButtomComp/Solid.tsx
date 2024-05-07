'use client';

import styled from 'styled-components';

interface Props {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

const SolidButton = styled.button<{ $isActive: boolean }>`
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.color.primary.normal : theme.color.palette.coolNeutral99};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.color.static.light : theme.color.label.normal};
  ${({ theme }) => theme.font.body2};

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.body3}
  }
`;

const Solid = ({ text, isActive, onClick, ...props }: Props) => {
  return (
    <SolidButton {...props} $isActive={isActive} onClick={onClick}>
      {text}
    </SolidButton>
  );
};

export default Solid;
export type SolidType = { Solid: typeof Solid };
