'use client';

import Image from 'next/image';
import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useSearchParams } from 'next/navigation';
import HeaderComp from '../HeaderComp';
import MobileRenderBox from '../HeaderComp/MobileRenderBox';
import DropdownDesktop from './DropdownDesktop';
import DropdownMobile from './DropdownMobile';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import icon_search from '@/app/assets/images/header/icon_search.png';
import usePostSearchQuery from '@/app/api/post/search/queries';

const ContainerFlex = styled(HeaderComp.Container)<{ $isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ $isActive, theme }) =>
      $isActive &&
      css`
        background: ${theme.color.static.light};
      `}
  }
`;

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchInputContainer = styled.div`
  position: relative;
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
  const searchParams = useSearchParams();
  const searchParam = searchParams.get('word');

  const [isActive, setIsActive] = useState(!!searchParam);
  const [isSearch, setIsSearch] = useState(false);
  const [word, setWord] = useState(searchParam || '');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data, refetch } = usePostSearchQuery(word);

  const posts = useMemo(() => {
    if (data?.success) return data.posts.slice(0, 5);
  }, [data]);
  const comments = useMemo(() => {
    if (data?.success) return data.comments.slice(0, 5);
  }, [data]);

  const handleSearchButton = useCallback(() => {
    setIsActive(true);
  }, []);

  const handleCancelButton = useCallback(() => {
    setWord('');
    setIsActive(false);
    setIsSearch(false);
  }, []);

  const search = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    if (!inputRef.current || inputRef.current.value.trim().length < 2) return;

    setWord(inputRef.current.value);
  }, []);

  useEffect(() => {
    refetch();
  }, [word]);

  return (
    <ContainerFlex $isActive={isSearch}>
      {isActive && (
        <MobileRenderBox renderMode="visible">
          <HeaderComp.CancelButton onClick={handleCancelButton} />
        </MobileRenderBox>
      )}
      <MobileRenderBox renderMode="hidden" isApply={isActive}>
        <FlexRowDiv>
          <HeaderComp.Logo margin={isActive ? '0' : '0 24px 0 0'} />
          {!isActive && <HeaderComp.Navigation />}
        </FlexRowDiv>
      </MobileRenderBox>

      {isActive && (
        <SearchInputContainer>
          <SearchImage src={icon_search} alt="검색 아이콘" width={24} height={24} />
          <SearchInput
            ref={inputRef}
            defaultValue={word}
            placeholder="검색어를 두 글자 이상 입력해 더 쉽게 찾아보세요."
            onKeyDown={search}
            onBlur={() => {
              if (!word) setIsSearch(false);
            }}
            onFocus={() => {
              setIsSearch(true);
            }}
          />
          <CancelButton onClick={handleCancelButton}>
            <Image src={`${IMAGE_CDN}/icon/Close.png`} alt="취소 아이콘" width={20} height={20} />
          </CancelButton>

          <DropdownDesktop word={word} isActive={isSearch} posts={posts} comments={comments} />
        </SearchInputContainer>
      )}

      <DropdownMobile word={word} isActive={isSearch} posts={posts} comments={comments} />

      <FlexRowDiv>
        {!isActive && <HeaderComp.SearchButton onClick={handleSearchButton} />}

        <MobileRenderBox renderMode="hidden" isApply={isActive}>
          <FlexRowDiv>
            <HeaderComp.AlertButton />
            <HeaderComp.ProfileButton />
          </FlexRowDiv>
        </MobileRenderBox>
      </FlexRowDiv>
    </ContainerFlex>
  );
};

export default SearchHeader;
