'use client';

import Image from 'next/image';
import styled from 'styled-components';
import NicnameComponent from '@/app/components/mypage/NicnameComponent';
import Tabs from '@/app/components/common/Tabs';
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

const ProfileDiv = styled.div`
  display: flex;
  flex-directioin: row;
`;

const ProfileImageDiv = styled.div`
  width: 140px;
  height: 140px;
  position: relative;
  overflow: hidden;
  margin-right: 24px;
  border-radius: 50%;
  background-color: #e0e0e0;
`;

const ProfileTextDiv = styled.div`
  display: flex;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const TitleStrong = styled.strong`
  font-size: 24px;
`;

const TagP = styled.p`
  padding: 2px;
  text-align: center;
  font-size: 24px;
  border-radius: 8px;
  background-color: #e0e0e0;
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
      <ProfileDiv>
        <ProfileImageDiv>
          <Image src={'/next.svg'} alt="프로필 이미지" fill={true} />
        </ProfileImageDiv>

        <ProfileTextDiv>
          <TitleStrong>프로필</TitleStrong>
          <NicnameComponent />
          <TagP>태그</TagP>
        </ProfileTextDiv>
      </ProfileDiv>

      <Tabs tabList={tabList} />
    </ContainerMain>
  );
}
