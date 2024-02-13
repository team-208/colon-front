'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <p>개발자 사이드 프로젝트 HOME!</p>
      <button
        onClick={() => {
          router.push('/examples/sample');
        }}
      >
        샘플 페이지 이동하기
      </button>
    </main>
  );
}
