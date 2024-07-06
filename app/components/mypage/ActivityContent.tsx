'use client';

import styled from 'styled-components';
import ActivityContentInner from './ActivityContentInner';
import useHistoryQuery from '@/app/api/auth/history/queries';
import SkeletonComp from '../common/SkeletonComp';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: 32px;
  }
`;

const ActivityContent = () => {
  const { data } = useHistoryQuery({ historyType: 'ACTIVITY' });

  return (
    <ContentContainer>
      {data ? <ActivityContentInner list={data.list} /> : <SkeletonComp.TabsUI />}
    </ContentContainer>
  );
};

export default ActivityContent;
