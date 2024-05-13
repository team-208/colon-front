'use client';

import { useState, useCallback } from 'react';
import styled from 'styled-components';
import FilterHeaderComp from '@/app/components/common/FilterHeaderComp';
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

const QnaListComp = () => {
  const chagneFilter = useCallback((idx: number) => {
    // TODO: filterMenu 따른 질문카드 영역 처리
  }, []);

  const changeSort = useCallback((idx: number) => {
    // TODO: sortMenu에 따른 질문카드 영역 처리
  }, []);

  return (
    <>
      <FilterHeaderComp>
        <FilterHeaderComp.Menu idx={0} text="전체" clickEvent={chagneFilter} />
        <FilterHeaderComp.Menu idx={1} text="기획" clickEvent={chagneFilter} />
        <FilterHeaderComp.Menu idx={2} text="개발" clickEvent={chagneFilter} />
        <FilterHeaderComp.Menu idx={3} text="디자인" clickEvent={chagneFilter} />
      </FilterHeaderComp>
      <SelectorContainerDiv>
        <SelectorComp defaultOption={{ idx: 0, text: '최신순' }}>
          <SelectorComp.Option idx={0} text="최신순" clickEvent={changeSort} />
          <SelectorComp.Option idx={1} text="반응순" clickEvent={changeSort} />
          <SelectorComp.Option idx={2} text="답변순" clickEvent={changeSort} />
          <SelectorComp.Option idx={3} text="스크랩순" clickEvent={changeSort} />
        </SelectorComp>
      </SelectorContainerDiv>
      {/* 질문카드 영역 */}
    </>
  );
};

export default QnaListComp;
