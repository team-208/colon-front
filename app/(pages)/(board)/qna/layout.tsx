import type { Metadata } from 'next';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'CO:LON | QnA 게시판 페이지',
  description: 'QnA 게시판 페이지 | desc 설정 필요',
};

const QnaLayout = ({ children }: Props) => {
  return <>{children}</>;
};

export default QnaLayout;
