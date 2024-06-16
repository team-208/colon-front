'use client';

import usePostQuery from '@/app/api/post/[id]/queries';
import Section from '@/app/components/common/Section';
import WriteHeader from '@/app/components/board/qna/write/WriteHeader';
import WriteFormComp from '@/app/components/board/qna/write/WriteFormComp';

interface Props {
  params: { id: string };
}

const ModifyPage = ({ params }: Props) => {
  const { data } = usePostQuery(params.id);

  // TODO: 글 수정권한 체크 페이지 리라우팅 처리

  return (
    <main>
      <WriteHeader />
      <Section direction="column" padding="0">
        {data && <WriteFormComp defaultPost={data} />}
      </Section>
    </main>
  );
};

export default ModifyPage;
