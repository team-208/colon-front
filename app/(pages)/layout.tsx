import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import GlobalContainer from '../components/common/GlobalContainer';
import Header from '../components/common/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CO:LON',
  description: '랜딩 페이지 | desc 설정 필요',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContainer>
          <Header />
          {children}
        </GlobalContainer>
      </body>
    </html>
  );
}
