'use client';

import styled from 'styled-components';

interface Props {
  onClick: () => void;
}

const Button = styled.button`
  min-width: 44px;
  height: 36px;
  padding: 8px 10px;
  color: #989ba2;
  ${({ theme }) => theme.font.body2}

  ${({ theme }) => theme.mediaQuery.mobile} {
    min-width: max-content;
    margin-left: 0;
    padding: 0;
  }
`;

const CancelButton = ({ onClick }: Props) => {
  return <Button onClick={onClick}>취소</Button>;
};

export default CancelButton;
export type CancelButtonType = { CancelButton: typeof CancelButton };
