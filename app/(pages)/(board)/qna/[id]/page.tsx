import { Metadata } from 'next';
import dayjs from 'dayjs';
import { Post } from '@/app/types/data';
import SectionComp from '@/app/components/common/SectionComp';
import QnA from '@/app/components/board/qna/QnA';
import Divider from '@/app/components/common/Divider';
import QnADetailContent from '@/app/components/board/qna/QnADetail/QnADetailContent';

interface Props {
  params: { id: string };
}

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

const QuestionPage = async ({ params }: Props) => {
  const post = await fetchPost(params.id);

  return (
    <main>
      <SectionComp direction="column" padding="0">
        <QnADetailContent
          status="COMPLETE"
          requestedMajor="DEVELOP"
          title="웹 화면 제목은 공백 포함 53자까지 가능 웹 화면 제목은 공백 포함 53자까지 가능 웹 화면 제목은 공백 포함 43자까지 가능"
          body={`여행은 새로운 경험과 추억을 선사하지만, 올바른 준비가 필수입니다. 이번 블로그 포스트에서는 여행자가 가져가야 할 10가지 필수 아이템을 상세히 소개합니다.\n첫째, 편안한 여행을 위한 양질의 여행 가방.\n두 번째는 다양한 환경에 대비할 수 있는 다용도 의류. 세 번째 아이템은 여행 중 긴급 상황에 대비한 응급 키트입니다.\n여행을 떠나기 전 이 목록을 체크하고, 최고의 여행 경험을 준비하세요!`}
          tags={['태그1', '태그2', '태그3', '태그4']}
          createdAt={dayjs()}
          updatedAt={dayjs()}
          author_nickname="우아한 코끼리"
          author_major="PLANNING"
        />
      </SectionComp>
    </main>
  );
};

export default QuestionPage;
