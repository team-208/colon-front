import MainContainer from '@/app/components/common/MainContainer';
import SectionComp from '@/app/components/common/SectionComp';
import Writecomp from '@/app/components/board/qna/WriteComp';

const WritePage = () => {
  return (
    <MainContainer>
      <SectionComp direction="column">
        QnA 게시글 작성 페이지
        <Writecomp />
      </SectionComp>
    </MainContainer>
  );
};

export default WritePage;
