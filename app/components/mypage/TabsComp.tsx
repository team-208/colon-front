'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import FilterHeaderComp from '../common/FilterHeaderComp';
import ReactionContent from '@/app/components/mypage/ReactionContent';
import ScrapContent from '@/app/components/mypage/ScrapContent';
import ActivityContent from '@/app/components/mypage/ActivityContent';

const TabTableDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;

const TabContentDiv = styled.div`
  width: inherit;
  max-height: calc(100% - 31px);
  overflow: auto;
`;

const contentList: JSX.Element[] = [<ReactionContent />, <ScrapContent />, <ActivityContent />];

const TabsComp = () => {
  const [content, setContent] = useState<JSX.Element>(contentList[0]);

  const changeFilter = (idx: number) => {
    setContent(contentList[idx]);
  };

  return (
    <TabTableDiv>
      <FilterHeaderComp>
        <FilterHeaderComp.Menu idx={0} text="반응한 글" clickEvent={changeFilter} />
        <FilterHeaderComp.Menu idx={1} text="스크랩" clickEvent={changeFilter} />
        <FilterHeaderComp.Menu idx={2} text="활동 내역" clickEvent={changeFilter} />
      </FilterHeaderComp>
      <React.Suspense fallback={<div>...loading</div>}>
        <TabContentDiv>{content}</TabContentDiv>
      </React.Suspense>
    </TabTableDiv>
  );
};

export default TabsComp;
