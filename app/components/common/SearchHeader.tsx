'use client';

import Image from 'next/image';
import { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import HeaderComp from './HeaderComp';
import Divider from './DividerComp';
import DropDown from './DropDown';
import MobileRenderBox from './HeaderComp/MobileRenderBox';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import icon_search from '@/app/assets/images/header/icon_search.png';
import usePostSearchQuery from '@/app/api/post/search/queries';
import { PostSearchItemProps } from '@/app/api/post/search/type';

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
const DropDownWidthFull = styled(DropDown)`
  width: 100%;
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

const MarginUl = styled.ul<{ $margin: number }>`
  > li {
    cursor: pointer;
  }

  > li:not(:last-of-type) {
    margin-bottom: ${({ $margin }) => $margin}px;
  }
`;

const ListTitleP = styled.p`
  ${({ theme }) => theme.font.heading2}
  margin-bottom: 16px;
`;

const PostDiv = styled.div`
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
`;

const CommentDiv = styled.div`
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
  border-radius: 15px;

  p {
    ${({ theme }) => theme.font.body1}
    color: ${({ theme }) => theme.color.primary.normal};
    margin-right: 10px;
  }

  &:hover {
    /* theme.color.primary.normal */
    background-color: rgba(0, 161, 255, 0.04);
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
  const [isActive, setIsActive] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [word, setWord] = useState('');
  const [posts, setPosts] = useState<PostSearchItemProps[]>();
  const [comments, setComments] = useState<PostSearchItemProps[]>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { push } = useRouter();

  const { data, refetch } = usePostSearchQuery(word);

  const handleSearchButton = useCallback(() => {
    setIsActive((v) => !v);
  }, []);

  const handleCancelButton = useCallback(() => {
    setWord('');
    setIsActive((v) => !v);
  }, []);

  const handleMoreButton = useCallback(() => {}, []);

  const handlePostClick = useCallback((id: string) => {
    push(`/qna/${id}`);
  }, []);

  const search = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    if (!inputRef.current) return;

    setWord(inputRef.current.value);
  }, []);

  useEffect(() => {
    refetch();
  }, [word]);

  useEffect(() => {
    if (data?.success) {
      setPosts(data.posts.slice(0, 5));
      setComments(data.comments.slice(0, 5));
    }
  }, [data]);

  return (
    <ContainerFlex>
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
            placeholder="검색어를 두 글자 이상 입력해 더 쉽게 찾아보세요."
            onKeyDown={search}
            onBlur={() => {
              if(!word) setIsSearch(false);
            }}
            onFocus={() => {
              setIsSearch(true);
            }}
          />
          <CancelButton onClick={handleCancelButton}>
            <Image src={`${IMAGE_CDN}/icon/Close.png`} alt="취소 아이콘" width={20} height={20} />
          </CancelButton>
          <DropDownWidthFull isActive={isSearch} defaultHeight={112}>
            <DropDownInnerDiv>
              {word && (
                <>
                  <ListTitleP>질문</ListTitleP>
                  <MarginUl $margin={8}>
                    {posts?.map((post) => (
                      <li
                        key={`post-${post.id}`}
                        onClick={() => {
                          handlePostClick(post.id);
                        }}
                      >
                        <PostDiv>
                          <Image
                            alt=""
                            src={`${IMAGE_CDN}/qna/CheckMarkButton_disable.png`}
                            width={20}
                            height={20}
                          />
                          <p>{post.text}</p>
                        </PostDiv>
                      </li>
                    ))}
                  </MarginUl>
                  <MarginDivider height={1} />
                  <ListTitleP>답변</ListTitleP>
                  <MarginUl $margin={16}>
                    {comments?.map((comment) => (
                      <li key={`comment-${comment.id}`}>
                        <PostDiv>
                          <Image
                            alt=""
                            src={`${IMAGE_CDN}/qna/CheckMarkButton_disable.png`}
                            width={20}
                            height={20}
                          />
                          <p>{comment.text}</p>
                        </PostDiv>
                        <CommentDiv>
                          <Image
                            alt=""
                            src={`${IMAGE_CDN}/icon/Icon_Reply_gray.png`}
                            width={20}
                            height={20}
                          />
                          <p>{comment.text}</p>
                        </CommentDiv>
                      </li>
                    ))}
                  </MarginUl>
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
                </>
              )}
            </DropDownInnerDiv>
          </DropDownWidthFull>
        </SearchInputContainer>
      )}

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
