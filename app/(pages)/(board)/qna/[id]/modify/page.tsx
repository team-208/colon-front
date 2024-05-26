'use client';

import usePostQuery from '@/app/api/post/[id]/queries';
import SectionComp from '@/app/components/common/SectionComp';
import WriteFormComp from '@/app/components/board/qna/write/WriteFormComp';

interface Props {
  params: { id: string };
}

const ModifyPage = ({ params }: Props) => {
  const { data } = usePostQuery(params.id);

  return (
    <main>
      <SectionComp direction="column" padding="0">
        {data && <WriteFormComp defaultPost={data} />}
      </SectionComp>
    </main>
  );
};

export default ModifyPage;
