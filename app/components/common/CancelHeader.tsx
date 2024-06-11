'use client';

import styled from 'styled-components';
import HeaderComp from './HeaderComp';

const ContainerFlex = styled(HeaderComp.Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
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

const CancelHeader = () => {
  return (
    <ContainerFlex>
      <CancelButton>취소</CancelButton>

      <FlexRowDiv>
        <HeaderComp.AlertButton />
        <HeaderComp.ProfileButton />
      </FlexRowDiv>
    </ContainerFlex>
  );
};

export default CancelHeader;
