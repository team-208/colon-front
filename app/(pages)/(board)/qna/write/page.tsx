import SectionComp from '@/app/components/common/SectionComp';
import Writecomp from '@/app/components/board/qna/WriteComp';

const WritePage = () => {
  return (
    <main>
      <SectionComp direction="column">
        QnA 게시글 작성 페이지
        <Writecomp />
      </SectionComp>
    </main>
  );
};

export default WritePage;
