'use client';

import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import DropDown from '../DropDown';
import { PostSearchItemProps } from '@/app/api/post/search/type';

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
    ${({ isActive }) =>
      isActive &&
      css`
        width: 100vw;
        height: 100vh;
        background: ${({ theme }) => theme.color.static.light};
        border-radius: 0;
      `}
  }
`;

const DropdownMobile = ({ isActive, posts, comments }: Props) => {
  useEffect(() => {
    if (isActive) document.body.classList.add('hidden');
    else document.body.classList.remove('hidden');
  }, [isActive]);

  return (
    <DropDownMobile isActive={isActive}>
      <div></div>
    </DropDownMobile>
  );
};

export default DropdownMobile;
