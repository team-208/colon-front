'use client';

import styled from 'styled-components';
import FilterHeaderComp, { filter } from '@/app/components/common/FilterHeaderComp';
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

const filterList = [
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
  const chagneFilter = (filter: filter) => {
    // TODO: filter에 따른 질문카드 영역 처리
  };

  return (
    <>
      <FilterHeaderComp filterList={filterList} onChange={chagneFilter} />
      <SelectorContainerDiv>
        <SelectorComp />
      </SelectorContainerDiv>
      {/* 질문카드 영역 */}
    </>
  );
};

export default QnaListComp;
