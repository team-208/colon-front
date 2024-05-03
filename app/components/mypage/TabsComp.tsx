'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import FilterHeaderComp, { filter } from '../common/FilterHeaderComp';
import ReactionContent from '@/app/components/mypage/ReactionContent';
import ScrapContent from '@/app/components/mypage/ScrapContent';
import ActivityContent from '@/app/components/mypage/ActivityContent';

const TabTableDiv = styled.div`
  width: 100%;
  height: fit-content;
  padding: 10px;
`;

const TabContentDiv = styled.div`
  width: inherit;
  max-height: 300px;
  overflow: auto;
  padding: 12px 0;
`;

const tabList: filter[] = [
  { text: '반응한 글', value: 0 },
  { text: '스크랩', value: 1 },
  { text: '활동 내역', value: 2 },
];

const contentList: JSX.Element[] = [<ReactionContent />, <ScrapContent />, <ActivityContent />];

const TabsComp = () => {
  const [content, setContent] = useState<JSX.Element>(contentList[0]);

  const changeFilter = (filter: filter) => {
    setContent(contentList[filter.value as number]);
  };

  return (
    <TabTableDiv>
      <FilterHeaderComp filterList={tabList} onChange={changeFilter} />
      <React.Suspense fallback={<div>...loading</div>}>
        <TabContentDiv>{content}</TabContentDiv>
      </React.Suspense>
    </TabTableDiv>
  );
};

export default TabsComp;
