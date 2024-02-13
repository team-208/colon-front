'use client';

import useAgifyMutation from '@/app/apis/agify/mutation/useAgifyMutation';
import useAgifyQuery from '@/app/apis/agify/query/useAgifyQuery';
import { useState } from 'react';

export default function ReactQueryCSRPage() {
  // states
  const [mutationData, setMutationData] = useState<Agify.postAgifyResult>();

  // queries
  const { data } = useAgifyQuery('huun');
  const { mutateAsync: agifyMutation } = useAgifyMutation({ name: 'dave' });

  // events
  const mutationHandler = async () => {
    const res = await agifyMutation();
    setMutationData(res);
  };

  return (
    <section>
      <p>react-query csr examples</p>

      <p>{data?.name}</p>
      <p>{data?.age}</p>
      <p>{data?.count}</p>

      <button type="button" onClick={mutationHandler}>
        post mutation request
      </button>
      {mutationData && <p>{`post mutation response id: ${mutationData?.id}`}</p>}
    </section>
  );
}
