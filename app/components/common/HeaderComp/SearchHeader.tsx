'use client';

import Image from 'next/image';
import { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Container from './Container';
import Logo from './Logo';
import Navigation from './Navigation';
import SearchButton from './SearchButton';
import AlertButton from './AlertButton';
import ProfileButton from './ProfileButton';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import icon_search from '@/app/assets/images/header/icon_search.png';

const ContainerFlex = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  max-width: 700px;
  width: 100%;
  height: 100%;
  margin: 0 10px;
`;

const SearchImage = styled(Image)`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
`;

const SearchInput = styled.input`
  width: inherit;
  height: inherit;
  padding: 6px 40px 6px 44px;
  border-radius: 10px;
  outline: none;
  border: 1px solid ${({ theme }) => theme.color.interaction.inactive};
  ${({ theme }) => theme.font.body2}

  &:focus {
    border-color: ${({ theme }) => theme.color.palette.deepSkyBlue55};
  }

  &::placeholder {
    font-weight: 400;
    color: ${({ theme }) => theme.color.interaction.inactive};
  }
`;

const CancelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
`;

const SearchHeader = () => {
  const [isSearch, setIsSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearchClick = useCallback(() => {
    setIsSearch((v) => !v);
  }, []);

  const handleCancelButton = useCallback(() => {
    setIsSearch((v) => !v);
  }, []);

  const search = useCallback(() => {}, []);

  return (
    <ContainerFlex>
      <FlexRowDiv>
        <Logo margin={isSearch ? '0' : '0 24px 0 0'} />
        {!isSearch && <Navigation />}
      </FlexRowDiv>

      {isSearch && (
        <SearchInputContainer>
          <SearchImage src={icon_search} alt="검색 아이콘" width={24} height={24} />
          <SearchInput ref={inputRef} placeholder="검색어를 입력해주세요." onMouseEnter={search} />
          <CancelButton onClick={handleCancelButton}>
            <Image src={`${IMAGE_CDN}/icon/Close.png`} alt="취소 아이콘" width={20} height={20} />
          </CancelButton>
        </SearchInputContainer>
      )}

      <FlexRowDiv>
        {!isSearch && <SearchButton onClick={handleSearchClick} />}
        <AlertButton />
        <ProfileButton />
      </FlexRowDiv>
    </ContainerFlex>
  );
};

export default SearchHeader;
export type SearchHeaderType = { SearchHeader: typeof SearchHeader };
