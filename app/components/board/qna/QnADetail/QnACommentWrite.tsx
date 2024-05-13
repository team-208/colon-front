'use client';

import useCommentsQuery from '@/app/api/comment/[postId]/queries';
import { useInsertCommentMutation } from '@/app/api/comment/mutations';
import useAuth from '@/app/hooks/useAuth';
import React, { useCallback, useRef } from 'react';
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
  const comment = useRef<string>('');

  const { userInfo } = useAuth();
  const { mutateAsync: insertComment } = useInsertCommentMutation();
  const { refetch: refetchComments } = useCommentsQuery(postId);

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    comment.current = e.target.value;
  };

  const handleClick = useCallback(async () => {
    if (!comment.current) {
      // TODO: tooltip 필요.
      return;
    }

    await insertComment({
      post_id: parseInt(postId),
      author_nickname: userInfo?.user.nick_name || '',
      comment: comment.current,
    });

    refetchComments();
  }, [comment]);

  return (
    <ContainerDiv>
      <CommentTextarea
        placeholder="질문에 대한 나의 의견을 남겨보세요."
        minRows={2}
        onChange={handleChangeComment}
      />
      <RegistButton onClick={handleClick}>등록</RegistButton>
    </ContainerDiv>
  );
};

export default QnACommentWrite;
