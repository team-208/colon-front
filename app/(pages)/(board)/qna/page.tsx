import SectionComp from '@/app/components/common/SectionComp';

const QnaPage = (props: any) => {
  const { children } = props;

  return <main>{children || <SectionComp direction="column">QnA 게시판 페이지</SectionComp>}</main>;
};

export default QnaPage;
