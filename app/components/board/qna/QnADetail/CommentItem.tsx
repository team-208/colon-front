'use client';

import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import { useModifyPostMutation } from '@/app/api/post/[id]/mutations';
import ButtonComp from '@/app/components/common/ButtomComp';
import CommentComp from '@/app/components/common/CommentComp';
import Modal from '@/app/components/common/ModalComp';
import useModal from '@/app/hooks/useModal';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import reactTextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

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
}

const CommentP = styled.p`
  ${({ theme }) => theme.font.body2};
  font-weight: 400;
  color: ${({ theme }) => theme.color.label.normal};
  margin: 6px 0 10px;
`;

const FooterBoxDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChoiceButton = styled(ButtonComp.Solid)`
  padding: 4px 10px;
  height: 26px;
  border-radius: 8px;
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
}: Props) => {
  const [isModify, setIsModify] = useState<boolean>(false);
  const [modifyComment, setModifyComment] = useState<string>('');

  const { mutateAsync } = useModifyPostMutation();

  const { refresh } = useRouter();
  const { openModal, closeModal } = useModal();

  const handleClickChoice = useCallback(async () => {
    await mutateAsync({ id: parseInt(postId), status: 'COMPLETE', accept_comment_id: commentId });
    refresh();
  }, []);

  const handleClickModify = useCallback(() => {
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
            onConfirm={() => {}}
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

  return (
    <CommentComp.Wrapper isNestedComment={isNestedComment} isModify={isModify}>
      <CommentComp.Header
        major={authorMajor}
        nickname={authorNickName}
        updatedAt={updatedAt}
        isSelected={isSelected}
        onClickModify={handleClickModify}
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
      <FooterBoxDiv>
        <CommentComp.Emojis emojis={emojis} />
        {isVisibleChoice && (
          <ChoiceButton isActive onClick={handleClickChoice}>
            글쓴이 채택
          </ChoiceButton>
        )}
      </FooterBoxDiv>
    </CommentComp.Wrapper>
  );
};

export default CommentItem;
