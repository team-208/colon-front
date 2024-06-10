import Section from '@/app/components/common/Section';
import WriteFormcomp from '@/app/components/board/qna/write/WriteFormComp';
import CancelHeader from '@/app/components/common/CancelHeader';

const WritePage = () => {
  return (
    <main>
      <CancelHeader />
      <Section direction="column" padding="0">
        <WriteFormcomp />
      </Section>
    </main>
  );
};

export default WritePage;
