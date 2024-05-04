'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';
import { RecoilRoot } from 'recoil';
import StyledComponentsRegistry from './StyledComponentRegistry';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '@/app/styles/theme';

interface GlobalContainerProps {
  children: ReactNode;
}

const GobalStyle = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6,
p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn,
em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var,
b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas,
details, embed, figure, figcaption, footer, header, hgroup, menu, nav,
output, ruby, section, summary, time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, footer, header,
hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

main {
  max-width: 1024px;
  margin: 0 auto;

  margin-top: ${({ theme }) => theme.heightSizes.header.desktop}px;

  ${({ theme }) => theme.mediaQuery.mobile} {
    margin-top: ${({ theme }) => theme.heightSizes.header.mobile}px;
  }
}

button {
  border: none;
  cursor: pointer;
  background-color: transparent;
  padding: 0;
}

* {
  box-sizing: border-box;
}

strong {
  font-weight: bold;
}

em {
  font-style: italic;
}

a {
  text-decoration: none;
}
`;

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
          <GobalStyle />
          <RecoilRoot>{children}</RecoilRoot>
        </ThemeProvider>
      </StyledComponentsRegistry>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default GlobalContainer;
