'use client';

import styled from 'styled-components';
import HeaderComp from './HeaderComp';

interface Props {
  onCancel: () => void;
}

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

const CancelHeader = ({ onCancel }: Props) => {
  return (
    <ContainerFlex>
      <HeaderComp.CancelButton onClick={onCancel} />

      <FlexRowDiv>
        <HeaderComp.AlertButton />
        <HeaderComp.ProfileButton />
      </FlexRowDiv>
    </ContainerFlex>
  );
};

export default CancelHeader;
