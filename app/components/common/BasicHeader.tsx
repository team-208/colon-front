'use client';

import { usePathname } from 'next/navigation';
import styled from 'styled-components';

import HeaderComp from './\bHeaderComp';

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

const BasicHeader = () => {
  const path = usePathname();

  return (
    <ContainerFlex>
      <FlexRowDiv>
        <HeaderComp.Logo margin="0 24px 0 0" />
        <HeaderComp.Navigation />
      </FlexRowDiv>

      {path !== '/' && (
        <FlexRowDiv>
          <HeaderComp.AlertButton />
          <HeaderComp.ProfileButton />
        </FlexRowDiv>
      )}
    </ContainerFlex>
  );
};

export default BasicHeader;
export type BasicHeaderType = { BasicHeader: typeof BasicHeader };
