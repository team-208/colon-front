'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';
import { RecoilRoot } from 'recoil';
import StyledComponentsRegistry from './StyledComponentRegistry';
import { ThemeProvider } from 'styled-components';
import theme from '@/app/styles/theme';
import mediaQuery from '@/app/styles/mediaQuery';

interface GlobalContainerProps {
  children: ReactNode;
}

const GlobalContainer = ({ children }: GlobalContainerProps) => {
  // states
  // TODO: theme 적용시 local storage로 computed 되도록 수정 필요.
  const [isWhiteTheme, setIsWhiteTheme] = useState<boolean>(true);
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
      <StyledComponentsRegistry>
        <ThemeProvider theme={theme}>
          <RecoilRoot>{children}</RecoilRoot>
        </ThemeProvider>
      </StyledComponentsRegistry>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default GlobalContainer;
