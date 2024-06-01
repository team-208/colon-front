import HeaderComp from '@/app/components/common/\bHeaderComp';
import SectionComp from '@/app/components/common/SectionComp';
import ProfileComp from '@/app/components/mypage/ProfileComp';
import TabsComp from '@/app/components/mypage/TabsComp';
import DeleteUserButton from '@/app/components/mypage/DeleteUserButton';

export default function MyPage() {
  return (
    <main>
      <HeaderComp.BasicHeader />
      <SectionComp direction="row">
        <ProfileComp />
      </SectionComp>

      <SectionComp direction="column">
        <TabsComp />
      </SectionComp>

      <DeleteUserButton />
    </main>
  );
}
