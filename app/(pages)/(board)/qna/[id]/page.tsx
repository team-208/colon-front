import { Metadata } from 'next';
import SearchHeader from '@/app/components/common/SearchHeader';
import Section from '@/app/components/common/Section';
import QnADetailContent from '@/app/components/board/qna/QnADetail/QnADetailContent';
import QnACommentList from '@/app/components/board/qna/QnADetail/QnACommentList';
import QnACommentWrite from '@/app/components/board/qna/QnADetail/QnACommentWrite';
import { fetchGetPost } from '@/app/api/post/[id]/fetch';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  const post = await fetchGetPost(id);

  return {
    title: `CO:LON | ${post.title}`,
    description: 'QnA 상세 페이지 | desc 설정 필요',
  };
}

const QuestionPage = async ({ params }: Props) => {
  const post = await fetchGetPost(params.id);

  return (
    <main>
      <SearchHeader />
      <Section direction="column" padding="0">
        <QnADetailContent post={post} />
      </Section>
      <Section direction="column" padding="0">
        <QnACommentList
          postId={params.id}
          acceptedCommentId={post.accepted_comment_id}
          postAuthor={post.author_nickname}
        />
      </Section>
      <Section direction="column" padding="0">
        <QnACommentWrite postId={params.id} />
      </Section>
    </main>
  );
};

export default QuestionPage;
