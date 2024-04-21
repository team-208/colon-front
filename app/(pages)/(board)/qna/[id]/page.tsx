import { Metadata } from 'next';
import dayjs from 'dayjs';
import { Post } from '@/app/types/data';

type Props = {
  params: { id: string };
  post: Post;
};

const post = await (async function (): Promise<Post> {
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
})();

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  return {
    title: `CO:LON | ${post.title}`,
    description: 'QnA 상세 페이지 | desc 설정 필요',
  };
}

const QuestionPage = (props: Props) => {
  return (
    <article>
      <p>{post.title}</p>
      <p>{post.nickname}</p>
      <p>{post.content}</p>
    </article>
  );
};

export default QuestionPage;
