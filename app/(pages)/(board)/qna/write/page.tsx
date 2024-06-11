import Section from '@/app/components/common/Section';
import WriteFormcomp from '@/app/components/board/qna/write/WriteFormComp';
import WriteHeader from '@/app/components/board/qna/write/WriteHeader';

const WritePage = () => {
  return (
    <main>
      <WriteHeader />
      <Section direction="column" padding="0">
        <WriteFormcomp />
      </Section>
    </main>
  );
};

export default WritePage;
