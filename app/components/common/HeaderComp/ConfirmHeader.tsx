'use client';

import styled from 'styled-components';
import Container from './Container';

const ContainerFlex = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CancelButton = styled.button`
  width: 44px;
  height: 36px;
  padding: 8px 10px;
  color: #989ba2;
  margin-left: 95px;
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

const ConfirmHeader = () => {
  return (
    <ContainerFlex>
      <CancelButton>취소</CancelButton>
      <CompleteButton>완료</CompleteButton>
    </ContainerFlex>
  );
};

export default ConfirmHeader;
export type ConfirmHeaderType = { ConfirmHeader: typeof ConfirmHeader };
