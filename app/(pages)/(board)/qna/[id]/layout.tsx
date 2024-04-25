import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const QuestionLayout = ({ children }: Props) => {
  return <>{children}</>;
};

export default QuestionLayout;
