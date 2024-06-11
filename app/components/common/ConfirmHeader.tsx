'use client';

import styled from 'styled-components';
import HeaderComp from './HeaderComp';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const ContainerFlex = styled(HeaderComp.Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CancelButton = styled.button`
  width: 44px;
  height: 36px;
  padding: 8px 10px;
  color: #989ba2;
  ${({ theme }) => theme.font.body2}

  ${({ theme }) => theme.mediaQuery.mobile} {
    margin-left: 0;
  }
`;

const CompleteButton = styled.button`
  width: 56px;
  height: 36px;
  background: ${({ theme }) => theme.color.palette.deepSkyBlue99};
  border-radius: 10px;
  padding: 8px 16px;
  margin-right: 95px;
  ${({ theme }) => theme.font.body2}
  color: ${({ theme }) => theme.color.primary.normal};

  ${({ theme }) => theme.mediaQuery.mobile} {
    margin-right: 0;
  }
`;

const ConfirmHeader = ({ onConfirm, onCancel }: Props) => {
  return (
    <ContainerFlex>
      <CancelButton onClick={onCancel}>취소</CancelButton>
      <CompleteButton onClick={onConfirm}>완료</CompleteButton>
    </ContainerFlex>
  );
};

export default ConfirmHeader;
