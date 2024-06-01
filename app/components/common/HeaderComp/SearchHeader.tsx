'use client';

import Image from 'next/image';
import styled from 'styled-components';
import Container from './Container';
import Logo from './Logo';
import Navigation from './Navigation';
import AlertButton from './AlertButton';
import ProfileButton from './ProfileButton';
import icon_search from '@/app/assets/images/header/icon_search.png';

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

const SearchButton = styled.button`
  position: relative;
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const SearchHeader = () => {
  return (
    <ContainerFlex>
      <FlexRowDiv>
        <Logo />
        <Navigation />
      </FlexRowDiv>

      <FlexRowDiv>
        <SearchButton>
          <Image alt="검색 아이콘" src={icon_search} fill sizes="24px" />
        </SearchButton>
        <AlertButton />
        <ProfileButton />
      </FlexRowDiv>
    </ContainerFlex>
  );
};

export default SearchHeader;
export type SearchHeaderType = { SearchHeader: typeof SearchHeader };
