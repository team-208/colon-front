'use client';

import { usePathname } from 'next/navigation';
import styled from 'styled-components';

import Container from './Container';
import Logo from './Logo';
import Navigation from './Navigation';
import AlertButton from './AlertButton';
import ProfileButton from './ProfileButton';

const ContainerFlex = styled(Container)`
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
        <Logo />
        <Navigation />
      </FlexRowDiv>

      {path !== '/' && (
        <FlexRowDiv>
          <AlertButton />
          <ProfileButton />
        </FlexRowDiv>
      )}
    </ContainerFlex>
  );
};

export default BasicHeader;
export type BasicHeaderType = { BasicHeader: typeof BasicHeader };
