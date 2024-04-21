import SectionComp from '@/app/components/common/SectionComp';
import Writecomp from '@/app/components/board/qna/write/WriteComp';

const WritePage = () => {
  return (
    <SectionComp direction="column">
      QnA 게시글 작성 페이지
      <Writecomp />
    </SectionComp>
  );
};

export default WritePage;
