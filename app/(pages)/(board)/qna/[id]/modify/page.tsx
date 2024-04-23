import dayjs from 'dayjs';
import { Post } from '@/app/types/data';
import SectionComp from '@/app/components/common/SectionComp';
import Writecomp from '@/app/components/board/qna/WriteComp';

interface Props {
  params: { id: string };
}

const fetchPost = async (id: string): Promise<Post> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        date: dayjs(),
        title: '안녕하세요. 궁금한게 있습니다.',
        content: '본문 내용입니다.',
        nickname: 'ohdal',
        modified: false,
        solved: false,
      });
    }, 1000);
  });
};

const ModifyPage = async ({ params }: Props) => {
  const post = await fetchPost(params.id);

  return (
    <SectionComp direction="column">
      QnA 게시글 수정 페이지
      <Writecomp defaultPost={post} />
    </SectionComp>
  );
};

export default ModifyPage;
