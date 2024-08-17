'use client';

import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import DropDown from '../DropDown';
import { PostSearchItemProps } from '@/app/api/post/search/type';
import ListBox from '../ListBox';
import NoSearchBox from '../NoSearchBox';

interface Props {
  isActive: boolean;
  word: string;
  posts: PostSearchItemProps[] | undefined;
  comments: PostSearchItemProps[] | undefined;
}

const DropDownMobile = styled(DropDown)<{ isActive: boolean }>`
  display: none;

  ${({ theme }) => theme.mediaQuery.mobile} {
    display: block;
    overflow: auto;

    ${({ isActive, theme }) =>
      isActive &&
      css`
        width: 100vw;
        height: 100vh;
        background: ${theme.color.static.light};
        border-radius: 0;
        padding-bottom: ${theme.heightSizes.header.mobile}px;
      `}
  }
`;

const DropdownMobile = ({ isActive, posts, comments, word }: Props) => {
  useEffect(() => {
    if (isActive) document.body.classList.add('hidden');
    else document.body.classList.remove('hidden');
  }, [isActive]);

  return (
    <DropDownMobile isActive={isActive}>
      {posts && posts.length > 0 ? <ListBox list={posts} /> : <NoSearchBox word={word} />}
    </DropDownMobile>
  );
};

export default DropdownMobile;
