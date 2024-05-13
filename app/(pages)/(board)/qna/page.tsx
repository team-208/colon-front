import SectionComp from '@/app/components/common/SectionComp';
import QnaListComp from '@/app/components/board/qna/QnaListComp';

const QnaPage = () => {
  return (
    <main>
      <SectionComp direction="column">
        {/* 질문하기 영역 */}
        <QnaListComp />
      </SectionComp>
    </main>
  );
};

export default QnaPage;
