import { ReactNode } from 'react';
import SectionComp from '@/app/components/common/SectionComp';

interface Props {
  children: ReactNode;
}

const QnaPage = (props: Props) => {
  const { children } = props;

  return <main>{children || <SectionComp direction="column">QnA 게시판 페이지</SectionComp>}</main>;
};

export default QnaPage;
