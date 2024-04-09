'use client';

import styled from 'styled-components';
import ProfileComp from '@/app/components/mypage/ProfileComp';
import Tabs from '@/app/components/common/TabsComp';
import ReactionContent from '@/app/components/mypage/ReactionContent';
import ScrapContent from '@/app/components/mypage/ScrapContent';
import ActivityContent from '@/app/components/mypage/ActivityContent';

const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  > *:not(:last-child) {
    margin-bottom: 24px;
  }
`;

const tabList = [
  {
    text: '반응한 글',
    component: <ReactionContent />,
  },
  {
    text: '스크랩',
    component: <ScrapContent />,
  },
  {
    text: '활동 내역',
    component: <ActivityContent />,
  },
];

export default function MyPage() {
  return (
    <ContainerMain>
      <ProfileComp />
      <Tabs tabList={tabList} />
    </ContainerMain>
  );
}
