'use client';

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import FilterHeader from '@/app/components/common/FilterHeader';
import Selector from '../../common/Selector';
import { GetPostListQuery } from '@/app/api/post/type';
import ListBox from './ListBox';
import SkeletonComp from '../../common/SkeletonComp';
import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';

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
  const [filter, setFilter] = useState<Omit<GetPostListQuery, 'offset'>>({
    order: 'DATE_DESC',
    major: 'ALL',
  });

  const chagneFilter = useCallback((major: JOB_GROUP_TYPES) => {
    setFilter((prev) => ({ ...prev, major }));
  }, []);

  const changeSort = useCallback((idx: number) => {
    // TODO: sortMenu에 따른 질문카드 영역 처리
  }, []);

  return (
    <>
      <FilterHeader>
        <FilterHeader.Menu idx={0} text="전체" clickEvent={() => chagneFilter('ALL')} />
        <FilterHeader.Menu idx={1} text="기획" clickEvent={() => chagneFilter('PLANNING')} />
        <FilterHeader.Menu idx={2} text="개발" clickEvent={() => chagneFilter('DEVELOP')} />
        <FilterHeader.Menu idx={3} text="디자인" clickEvent={() => chagneFilter('DESIGN')} />
      </FilterHeader>
      <SelectorContainerDiv>
        <Selector defaultOption={{ idx: 0, text: '최신순' }}>
          <Selector.Option idx={0} text="최신순" clickEvent={changeSort} />
          <Selector.Option idx={1} text="반응순" clickEvent={changeSort} />
          <Selector.Option idx={2} text="답변순" clickEvent={changeSort} />
          <Selector.Option idx={3} text="스크랩순" clickEvent={changeSort} />
        </Selector>
      </SelectorContainerDiv>

      <React.Suspense fallback={<SkeletonComp.ListBoxUI />}>
        <ListBox filter={filter} />
      </React.Suspense>
    </>
  );
};

export default QnaListComp;
