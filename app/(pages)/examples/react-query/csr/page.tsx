'use client';

import useAgifyQuery from '@/app/apis/agify/query/useAgifyQuery';
import { Suspense } from 'react';

export default function ReactQueryCSRPage() {
  const { data } = useAgifyQuery('huun');

  return (
    <section>
      <p>react-query csr examples</p>

      <p>{data?.name}</p>
      <p>{data?.age}</p>
      <p>{data?.count}</p>
    </section>
  );
}
