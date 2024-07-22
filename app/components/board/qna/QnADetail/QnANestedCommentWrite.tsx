'use client';

import useCommentsQuery from '@/app/api/comment/[postId]/queries';
import { useInsertCommentMutation } from '@/app/api/comment/mutations';
import ButtonComp from '@/app/components/common/ButtomComp';
import useAuth from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useCallback, useRef, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

interface Props {
  postId: string;
  commentId: number;
  onClickClose: () => void;
  onSuccessWrite: () => void;
}

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  width: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme.color.palette.coolNeutral97};
`;

const HeaderP = styled.p`
  margin-bottom: 8px;
  ${({ theme }) => theme.font.caption1};
  font-weight: bold;
  color: ${({ theme }) => theme.color.label.normal};
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

const ButtonBoxDiv = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const CancelButton = styled(ButtonComp.OutlinedPrimary)`
  margin-right: 8px;
  padding: 8px 12px;
  border-radius: 11px;
  ${({ theme }) => theme.font.body3};
`;

const RegistButton = styled(ButtonComp.Solid)`
  padding: 8px 12px;
  border-radius: 11px;
  ${({ theme }) => theme.font.body3};
`;

const QnANestedCommentWrite = ({ postId, commentId, onClickClose, onSuccessWrite }: Props) => {
  const [comment, setComment] = useState<string>('');

  const { userInfo } = useAuth();
  const { mutateAsync: insertComment } = useInsertCommentMutation();
  const { refetch: refetchComments } = useCommentsQuery(postId);

  const { refresh } = useRouter();

  const handleChangeComment = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  }, []);

  const handleClick = useCallback(async () => {
    if (!comment) {
      // TODO: tooltip 필요.
      return;
    }

    await insertComment({
      post_id: parseInt(postId),
      author_nickname: userInfo?.user.nick_name || '',
      comment,
      author_major: userInfo?.user.major || '',
      original_comment: commentId,
    });

    refetchComments();
    setComment('');
    refresh();

    onSuccessWrite();
  }, [comment, userInfo]);

  return (
    <ContainerDiv>
      <HeaderP>@ {userInfo?.user?.nick_name}</HeaderP>

      <CommentTextarea
        placeholder="답댓을 작성해주세요."
        minRows={2}
        onChange={handleChangeComment}
        value={comment}
      />

      <ButtonBoxDiv>
        <CancelButton size="sm" isActive onClick={onClickClose}>
          취소
        </CancelButton>
        <RegistButton size="sm" isActive onClick={handleClick}>
          등록
        </RegistButton>
      </ButtonBoxDiv>
    </ContainerDiv>
  );
};

export default QnANestedCommentWrite;
