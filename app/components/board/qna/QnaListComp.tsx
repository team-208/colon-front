'use client';

import { useState, useCallback } from 'react';
import styled from 'styled-components';
import FilterHeaderComp, { filterType } from '@/app/components/common/FilterHeaderComp';
import SelectorComp from '../../common/SelectorComp';

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
  const [filterMenu, setFilterMenu] = useState(filterMenuList[0]);

  const chagneFilter = useCallback((filter: filterType) => {
    // TODO: filterMenu 따른 질문카드 영역 처리
    setFilterMenu(filter);
  }, []);

  const changeOption = useCallback((idx: number) => {
    // TODO: sortMenu에 따른 질문카드 영역 처리
  }, []);

  return (
    <>
      <FilterHeaderComp filterList={filterMenuList} onChange={chagneFilter} />
      <SelectorContainerDiv>
        <SelectorComp defaultOption={{ idx: 0, text: '최신순' }}>
          <SelectorComp.Option idx={0} text="최신순" clickEvent={changeOption} />
          <SelectorComp.Option idx={1} text="반응순" clickEvent={changeOption} />
          <SelectorComp.Option idx={2} text="답변순" clickEvent={changeOption} />
          <SelectorComp.Option idx={3} text="스크랩순" clickEvent={changeOption} />
        </SelectorComp>
      </SelectorContainerDiv>
      {/* 질문카드 영역 */}
    </>
  );
};

export default QnaListComp;
