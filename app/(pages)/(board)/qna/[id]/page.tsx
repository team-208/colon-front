import { Metadata } from 'next';
import dayjs from 'dayjs';
import { Post } from '@/app/types/data';
import SectionComp from '@/app/components/common/SectionComp';

type Props = {
  params: { id: string };
};

const fetchPost = async (id: string): Promise<Post> => {
  // TODO: get post api 연동
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  const post = await fetchPost(id);

  return {
    title: `CO:LON | ${post.title}`,
    description: 'QnA 상세 페이지 | desc 설정 필요',
  };
}

const QuestionPage = async (props: Props) => {
  const { params } = props;

  const post = await fetchPost(params.id);

  return (
    <SectionComp direction="column">
      <article>
        <p>{post.title}</p>
        <p>{post.nickname}</p>
        <p>{post.content}</p>
      </article>
    </SectionComp>
  );
};

export default QuestionPage;
