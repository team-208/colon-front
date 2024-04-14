'use client';

import { useRouter } from 'next/navigation';

export default function Error404Page() {
  const { replace } = useRouter();

  const handleClickHome = () => {
    replace('/');
  };

  return (
    <main>
      <h1>일시적으로 서버에 문제가 발생했어요. :(</h1>
      <button onClick={handleClickHome}>홈으로 돌아가기</button>
    </main>
  );
}
