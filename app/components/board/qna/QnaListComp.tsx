'use client';

import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { sortMenuList } from '@/app/constants/menu';
import FilterHeaderComp, { filterType } from '@/app/components/common/FilterHeaderComp';
import SelectorComp, { MenuType } from '../../common/SelectorComp';

const SelectorContainerDiv = styled.div`
  width: 100%;
  height: 28px;
  padding: 0 20px;

  > * {
    float: right;
    line-height: 28px;
  }
`;

const filterMenuList: filterType[] = [
  {
    text: '전체',
    value: 0,
  },
  {
    text: '기획',
    value: 1,
  },
  {
    text: '개발',
    value: 2,
  },
  {
    text: '디자인',
    value: 3,
  },
];

const QnaListComp = () => {
  const [sortMenu, setSortMenu] = useState(sortMenuList[0]);
  const [filterMenu, setFilterMenu] = useState(filterMenuList[0]);

  const chagneFilter = useCallback((filter: filterType) => {
    // TODO: filterMenu 따른 질문카드 영역 처리
    setFilterMenu(filter);
  }, []);

  const changeSortMenu = useCallback((menu: MenuType) => {
    // TODO: sortMenu에 따른 질문카드 영역 처리
    setSortMenu(menu);
  }, []);

  return (
    <>
      <FilterHeaderComp filterList={filterMenuList} onChange={chagneFilter} />
      <SelectorContainerDiv>
        <SelectorComp menuList={sortMenuList} onChange={changeSortMenu} />
      </SelectorContainerDiv>
      {/* 질문카드 영역 */}
    </>
  );
};

export default QnaListComp;
