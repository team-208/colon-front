'use client';

import Image from 'next/image';
import styled from 'styled-components';
import icon_search from '@/app/assets/images/header/icon_search.png';

interface Props {
  onClick: () => void;
}

const Button = styled.button`
  position: relative;
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const SearchButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick}>
      <Image alt="검색 아이콘" src={icon_search} width={24} height={24} />
    </Button>
  );
};

export default SearchButton;
export type SearchButtonType = { SearchButton: typeof SearchButton };
