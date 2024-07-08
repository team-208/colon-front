'use client';

import { useSearchParams } from 'next/navigation';

const QnaSerachList = () => {
  const searchParams = useSearchParams();
  const param = searchParams.get('word');

  return <div>param: {param}</div>;
};

export default QnaSerachList;
