'use client';

import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

type Props = {
  initIdx?: number;
  tabList: Array<{ text: string; component: React.JSX.Element }>;
};

const TabTableDiv = styled.div`
  width: 100%;
  height: fit-content;
  padding: 10px;
`;

const TabListUl = styled.ul`
  width: inherit;
  border-bottom: 1px solid #000000;
`;

const TabListLi = styled.li`
  display: inline-block;
  cursor: pointer;
  padding: 12px 0;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const TabContentDiv = styled.div`
  width: inherit;
  max-height: 300px;
  overflow: auto;
  padding: 12px;
`;

export default function Tabs(props: Props) {
  const { initIdx, tabList } = props;

  const [curIdx, setCurIdx] = useState(initIdx || 0);

  return (
    <TabTableDiv>
      <TabListUl>
        {tabList.map((v, idx) => (
          <TabListLi
            style={{ fontWeight: curIdx === idx ? '800' : 'normal' }}
            key={`$tab-${idx}`}
            onClick={() => setCurIdx(idx)}
          >
            {v.text}
          </TabListLi>
        ))}
      </TabListUl>
      <TabContentDiv>{tabList[curIdx].component}</TabContentDiv>
    </TabTableDiv>
  );
}
