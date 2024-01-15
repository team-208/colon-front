'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const ReactQueryProvider = ({ children }: React.PropsWithChildren) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false, // 윈도우가 다시 포커스되었을때 데이터를 refetch
          refetchOnMount: false, // 데이터가 stale 상태이면 컴포넌트가 마운트될 때 refetch
          retry: 0, // API 요청 실패시 재시도
          throwOnError: true, // ErrorBoundary 사용
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
