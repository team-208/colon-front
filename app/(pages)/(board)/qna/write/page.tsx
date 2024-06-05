import HeaderComp from '@/app/components/common/\bHeaderComp';
import Section from '@/app/components/common/Section';
import WriteFormcomp from '@/app/components/board/qna/write/WriteFormComp';

const WritePage = () => {
  return (
    <main>
      <HeaderComp.CancelHeader />
      <Section direction="column" padding="0">
        <WriteFormcomp />
      </Section>
    </main>
  );
};

export default WritePage;
