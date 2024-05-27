'use client';

import QuestionCard from '@/app/components/common/QuestionCard';
import dayjs from 'dayjs';

export default function Home() {
  return (
    <main>
      <QuestionCard
        id={1}
        status="COMPLETE"
        requested_major="DEVELOP"
        title="웹 화면 제목은 공백 포함 53자까지 가능 웹 화면 제목은 공백 포함 53자까지 가능 웹 화면 제목은 공백 포함 43자까지 가능"
        body=""
        preview_body={`여행은 새로운 경험과 추억을 선사하지만, 올바른 준비가 필수입니다. 이번 블로그 포스트에서는 여행자가 가져가야 할 10가지 필수 아이템을 상세히 소개합니다. 첫째, 편안한 여행을 위한 양질의 여행 가방. 두 번째는 다양한 환경에 대비할 수 있는 다용도 의류. 세 번째 아이템은 여행 중 긴급 상황에 대비한 응급 키트입니다. 네 번째는 휴대용 충전기와 보조 배터리로, 언제 어디서든 기기를 충전할 수 있게 해줍니다. 다섯 번째는 고성능 카...`}
        tags={[]}
        created_at={''}
        updated_at={''}
        author_nickname="우아한 코끼리"
        author_major="PLANNING"
        author_profile_url="/"
      />
    </main>
  );
}
