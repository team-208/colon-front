'use client';

import ReactTextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

interface Props {
  postId: string;
}

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: 700px;
  width: 100%;
  margin: 0 auto 100px;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.background.alternative};
`;

const CommentTextarea = styled(ReactTextareaAutosize)`
  width: 100%;
  border: none;
  background-color: ${({ theme }) => theme.color.background.normal};
  padding: 8px 10px;
  resize: none;
  outline: none;
  border-radius: 8px;
`;

const RegistButton = styled.button`
  margin-top: 10px;
  padding: 4px 10px;
  ${({ theme }) => theme.font.body3};
  color: ${({ theme }) => theme.color.primary.normal};
`;

const QnACommentWrite = ({ postId }: Props) => {
  return (
    <ContainerDiv>
      <CommentTextarea placeholder="질문에 대한 나의 의견을 남겨보세요." minRows={2} />
      <RegistButton>등록</RegistButton>
    </ContainerDiv>
  );
};

export default QnACommentWrite;
