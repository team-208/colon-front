'use client';

import styled from 'styled-components';

interface Props {
  onClick: () => void;
}

const Button = styled.button`
  min-width: 56px;
  height: 36px;
  background: ${({ theme }) => theme.color.palette.deepSkyBlue99};
  border-radius: 10px;
  padding: 8px 16px;
  ${({ theme }) => theme.font.body2}
  color: ${({ theme }) => theme.color.primary.normal};

  ${({ theme }) => theme.mediaQuery.mobile} {
    background: none;
    min-width: max-content;
    margin-right: 0;
    padding: 0;
  }
`;

const CompleteButton = ({ onClick }: Props) => {
  return <Button onClick={onClick}>완료</Button>;
};

export default CompleteButton;
export type CompleteButtonType = { CompleteButton: typeof CompleteButton };
