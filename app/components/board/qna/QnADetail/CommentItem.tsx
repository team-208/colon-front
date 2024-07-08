'use client';

import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import useCommentsQuery from '@/app/api/comment/[postId]/queries';
import { useUpdateCommentReactionMutation } from '@/app/api/comment/reaction/mutations';
import { useDeleteCommentMutation, useUpdateCommentMutation } from '@/app/api/comment/mutations';
import { useModifyPostMutation } from '@/app/api/post/[id]/mutations';
import ButtonComp from '@/app/components/common/ButtomComp';
import CommentComp from '@/app/components/common/CommentComp';
import Modal from '@/app/components/common/ModalComp';
import useAuth from '@/app/hooks/useAuth';
import useModal from '@/app/hooks/useModal';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import reactTextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import QnANestedCommentWrite from './QnANestedCommentWrite';

interface Props {
  postId: string;
  commentId: number;
  isNestedComment: boolean;
  authorMajor: JOB_GROUP_TYPES;
  authorNickName: string;
  updatedAt: string;
  isSelected: boolean;
  comment: string;
  isVisibleChoice: boolean;
  likeCount: number;
  nestedCommentCount?: number;
}

const CommentP = styled.p`
  ${({ theme }) => theme.font.body2};
  font-weight: 400;
  color: ${({ theme }) => theme.color.label.normal};
  margin: 6px 0 10px;
`;

const FooterBoxDiv = styled.div<{ $isModify: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $isModify }) => ($isModify ? 'flex-end' : 'space-between')};
`;

const ChoiceButton = styled(ButtonComp.OutlinedPrimary)`
  padding: 4px 10px;
  height: 26px;
  border-radius: 8px;
  ${({ theme }) => theme.font.body3};
`;

const CommentTextarea = styled(reactTextareaAutosize)`
  margin: 26px 0 12px;
  width: 100%;
  border: none;
  background-color: ${({ theme }) => theme.color.background.normal};
  padding: 8px 10px;
  resize: none;
  outline: none;
  border-radius: 8px;
`;

const ModifyButton = styled(ButtonComp.Solid)`
  border-radius: 11px;
  padding: 8px 12px;
  align-self: flex-end;
`;

// TODO: 수정필요.
const emojis = {
  thumbsUp: 2,
  smilingHeart: 4,
  heart: 0,
};

const CommentItem = ({
  postId,
  commentId,
  isNestedComment,
  authorMajor,
  authorNickName,
  updatedAt,
  isSelected,
  comment,
  isVisibleChoice,
  likeCount,
  nestedCommentCount,
}: Props) => {
  const [isModify, setIsModify] = useState<boolean>(false);
  const [isOpenNestedComment, setIsOpenNestedComment] = useState<boolean>(false);
  const [modifyComment, setModifyComment] = useState<string>('');

  const { refetch } = useCommentsQuery(postId);
  const { mutateAsync } = useModifyPostMutation();
  const { mutateAsync: updateCommentMutation } = useUpdateCommentMutation();
  const { mutateAsync: updateCommentReactionMutation } = useUpdateCommentReactionMutation();
  const { mutateAsync: deleteCommentMutation } = useDeleteCommentMutation();
  const { userInfo } = useAuth();

  const { refresh } = useRouter();
  const { openModal, closeModal } = useModal();

  const handleClickChoice = useCallback(async () => {
    await mutateAsync({ id: parseInt(postId), status: 'COMPLETE', accept_comment_id: commentId });
    refresh();
  }, []);

  const handleClickModifyOpen = useCallback(() => {
    setIsModify(true);
  }, []);

  const handleClickDelete = useCallback(() => {
    openModal({
      modalProps: {
        contents: (
          <Modal.Confirm
            isReverseButton
            confirmLabel="삭제"
            cancelLabel="취소"
            onConfirm={async () => {
              await deleteCommentMutation({ commentId, postId: parseInt(postId) });
              await refetch();
              closeModal();
            }}
            onCancel={() => {
              closeModal();
            }}
          >
            {`{댓글}을 삭제하시나요?`}
          </Modal.Confirm>
        ),
      },
    });
  }, []);

  const handleChangeComment = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModifyComment(e.target.value);
  }, []);

  const handleClickModify = useCallback(async () => {
    if (modifyComment) {
      await updateCommentMutation({ commentId, comment: modifyComment });
      setIsModify(false);
      setModifyComment('');
      refetch();
    }
  }, [modifyComment]);

  const handleClickWriteClose = useCallback(() => {
    setIsOpenNestedComment(false);
  }, []);

  const handleClickLike = useCallback(async () => {
    // TODO: 비로그인 유저 처리 필요.

    await updateCommentReactionMutation({ commentId: commentId, curReactionCount: likeCount });
    refetch();
  }, []);

  const handleClickNestedComment = useCallback(() => {
    setIsOpenNestedComment(true);
  }, []);

  return (
    <>
      <CommentComp.Wrapper isNestedComment={isNestedComment} isModify={isModify}>
        <CommentComp.Header
          major={authorMajor}
          nickname={authorNickName}
          updatedAt={updatedAt}
          isSelected={isSelected}
          isAuthor={userInfo?.user?.nick_name === authorNickName}
          onClickModify={handleClickModifyOpen}
          onClickDelete={handleClickDelete}
        />
        <CommentP>{comment}</CommentP>
        {isModify && (
          <CommentTextarea
            placeholder={comment}
            minRows={2}
            onChange={handleChangeComment}
            value={modifyComment}
          />
        )}

        {authorNickName !== null && (
          <FooterBoxDiv $isModify={isModify}>
            {!isModify && (
              <CommentComp.Reactions
                likeCount={likeCount}
                nestedCommentCount={isNestedComment ? undefined : nestedCommentCount}
                onClickLike={handleClickLike}
                onClickNestedComment={handleClickNestedComment}
              />
            )}
            {isVisibleChoice && (
              <ChoiceButton isActive onClick={handleClickChoice}>
                글쓴이 채택
              </ChoiceButton>
            )}

            {isModify && (
              <ModifyButton size="sm" isActive onClick={handleClickModify}>
                수정
              </ModifyButton>
            )}
          </FooterBoxDiv>
        )}
      </CommentComp.Wrapper>
      {isOpenNestedComment && (
        <QnANestedCommentWrite
          postId={postId}
          commentId={commentId}
          onClickClose={handleClickWriteClose}
          onSuccessWrite={() => {
            setIsOpenNestedComment(false);
          }}
        />
      )}
    </>
  );
};

export default CommentItem;
