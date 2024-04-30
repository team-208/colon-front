import SectionComp from '@/app/components/common/SectionComp';
import ProfileComp from '@/app/components/mypage/ProfileComp';
import Tabs from '@/app/components/common/TabsComp';
import ReactionContent from '@/app/components/mypage/ReactionContent';
import ScrapContent from '@/app/components/mypage/ScrapContent';
import ActivityContent from '@/app/components/mypage/ActivityContent';

const tabList = [
  { text: '반응한 글', component: <ReactionContent /> },
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
    <main>
      <SectionComp direction="row">
        <ProfileComp />
      </SectionComp>

      <SectionComp direction="column">
        <Tabs tabList={tabList} />
      </SectionComp>
    </main>
  );
}
