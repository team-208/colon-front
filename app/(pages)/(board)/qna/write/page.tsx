import HeaderComp from '@/app/components/common/\bHeaderComp';
import SectionComp from '@/app/components/common/SectionComp';
import WriteFormcomp from '@/app/components/board/qna/write/WriteFormComp';

const WritePage = () => {
  return (
    <main>
      <HeaderComp.CancelHeader/>
      <SectionComp direction="column" padding="0">
        <WriteFormcomp />
      </SectionComp>
    </main>
  );
};

export default WritePage;
