'use client';

import Image from 'next/image';
import { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import HeaderComp from './\bHeaderComp';
import Divider from './DividerComp';
import DropDown from './DropDown';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import icon_search from '@/app/assets/images/header/icon_search.png';

const ContainerFlex = styled(HeaderComp.Container)`
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

const DropDownInnerDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 24px 20px;
`;

const MarginDivider = styled(Divider.Horizonal)`
  margin: 16px 0;
`;

const ListTitleP = styled.p`
  ${({ theme }) => theme.font.heading2}
  margin-bottom: 16px;
`;

const PostLi = styled.li`
  display: flex;
  flex-direction: row;

  img {
    margin-right: 12px;
  }

  p {
    ${({ theme }) => theme.font.body1}
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  &:not(:last-of-type) {
    margin-bottom: 8px;
  }
`;

const CommentLi = styled.li`
  display: flex;
  flex-direction: row;

  img {
    margin: 0 12px;
  }

  p {
    ${({ theme }) => theme.font.body2}
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  &:not(:last-of-type) {
    margin-bottom: 16px;
  }
`;

const DropDownFooterDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
`;

const MoreButton = styled.button`
  width: 160px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  p {
    ${({ theme }) => theme.font.body1}
    color: ${({ theme }) => theme.color.primary.normal};
    margin-right: 10px;
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

const postList = [
  {
    id: 1,
    title:
      '웹 화면 제목은 공백 포함 53자까지 가능 웹 화면 제목은 공백 포함 53자까지 가능 웹화면 제목은 공백 포함 43자까지 가능',
  },
  {
    id: 2,
    title:
      '웹 화면 제목은 공백 포함 53자까지 가능 웹 화면 제목은 공백 포함 53자까지 가능 웹화면 제목은 공백 포함 43자까지 가능',
  },
  {
    id: 3,
    title:
      '웹 화면 제목은 공백 포함 53자까지 가능 웹 화면 제목은 공백 포함 53자까지 가능 웹화면 제목은 공백 포함 43자까지 가능',
  },
];

const commentList = [
  {
    id: 1,
    title: '글 제목',
    text: '웹 화면 제목은 공백 포함 53자까지 가능 웹 화면 제목은 공백 포함 53자까지 가능 웹화면 제목은 공백 포함 43자까지 가능',
  },
  {
    id: 2,
    title: '글 제목',
    text: '웹 화면 제목은 공백 포함 53자까지 가능 웹 화면 제목은 공백 포함 53자까지 가능 웹화면 제목은 공백 포함 43자까지 가능',
  },
  {
    id: 3,
    title: '글 제목',
    text: '웹 화면 제목은 공백 포함 53자까지 가능 웹 화면 제목은 공백 포함 53자까지 가능 웹화면 제목은 공백 포함 43자까지 가능',
  },
];

const SearchHeader = () => {
  const [isActive, setIsActive] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearchButton = useCallback(() => {
    setIsActive((v) => !v);
  }, []);

  const handleCancelButton = useCallback(() => {
    setIsActive((v) => !v);
  }, []);

  const handleMoreButton = useCallback(() => {}, []);

  const search = useCallback(() => {}, []);

  return (
    <ContainerFlex>
      <FlexRowDiv>
        <HeaderComp.Logo margin={isActive ? '0' : '0 24px 0 0'} />
        {!isActive && <HeaderComp.Navigation />}
      </FlexRowDiv>

      {isActive && (
        <SearchInputContainer>
          <SearchImage src={icon_search} alt="검색 아이콘" width={24} height={24} />
          <SearchInput
            ref={inputRef}
            placeholder="검색어를 입력해주세요."
            onMouseEnter={search}
            onBlur={() => {
              setIsSearch(false);
            }}
            onFocus={() => {
              setIsSearch(true);
            }}
          />
          <CancelButton onClick={handleCancelButton}>
            <Image src={`${IMAGE_CDN}/icon/Close.png`} alt="취소 아이콘" width={20} height={20} />
          </CancelButton>
          <DropDown isActive={isSearch} defaultHeight={112}>
            <DropDownInnerDiv>
              <ListTitleP>질문</ListTitleP>
              <ul>
                {postList.map((post) => (
                  <PostLi key={`post-${post.id}`}>
                    <Image
                      alt=""
                      src={`${IMAGE_CDN}/qna/CheckMarkButton_disable.png`}
                      width={20}
                      height={20}
                    />
                    <p>{post.title}</p>
                  </PostLi>
                ))}
              </ul>
              <MarginDivider height={1} />
              <ListTitleP>답변</ListTitleP>
              <ul>
                {commentList.map((comment) => (
                  <div key={`comment-${comment.id}`}>
                    <PostLi>
                      <Image
                        alt=""
                        src={`${IMAGE_CDN}/qna/CheckMarkButton_disable.png`}
                        width={20}
                        height={20}
                      />
                      <p>{comment.title}</p>
                    </PostLi>
                    <CommentLi>
                      <Image
                        alt=""
                        src={`${IMAGE_CDN}/icon/Icon_Reply_gray.png`}
                        width={20}
                        height={20}
                      />
                      <p>{comment.text}</p>
                    </CommentLi>
                  </div>
                ))}
              </ul>
              <DropDownFooterDiv>
                <MoreButton onClick={handleMoreButton}>
                  <p>더 찾아보기</p>
                  <Image
                    alt="다음 아이콘"
                    src={`${IMAGE_CDN}/icon/Arrow_Right_Blue.png`}
                    width={24}
                    height={24}
                  />
                </MoreButton>
              </DropDownFooterDiv>
            </DropDownInnerDiv>
          </DropDown>
        </SearchInputContainer>
      )}

      <FlexRowDiv>
        {!isActive && <HeaderComp.SearchButton onClick={handleSearchButton} />}
        <HeaderComp.AlertButton />
        <HeaderComp.ProfileButton />
      </FlexRowDiv>
    </ContainerFlex>
  );
};

export default SearchHeader;
