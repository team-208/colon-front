'use client';

import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { JOB_GROUP_LABELS } from '../constants';
import CommentComp from '../common/CommentComp';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import { HistoryPost, HistoryComment } from '@/app/api/auth/history/type';
import { useDeleteCommentMutation } from '@/app/api/comment/mutations';
import useModal from '@/app/hooks/useModal';
import useHistoryQuery from '@/app/api/auth/history/queries';
import Modal from '../common/ModalComp';

interface Props extends HistoryPost, HistoryComment {}

const CommentCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
`;

const PostAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 24px;
  background: ${({ theme }) => theme.color.static.light};
  border: 1px solid ${({ theme }) => theme.color.palette.coolNeutral97};
  box-shadow: 0px 1px 10px -3px rgba(126, 145, 157, 0.15);
  border-radius: 8px;
  z-index: 1;
`;

const CommentAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  background: ${({ theme }) => theme.color.static.light};
  border: 1px solid ${({ theme }) => theme.color.palette.coolNeutral97};
  box-shadow: 0px 1px 10px -3px rgba(126, 145, 157, 0.15);
  border-radius: 8px;
  transform: translateY(-5px);
`;

const CommentAreaHeader = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const CommentAreaFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleP = styled.p`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.font.body1}
  color: ${({ theme }) => theme.color.label.normal};
  margin-top: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  img {
    margin-right: 8px;
  }
`;

// TODO: PostComp 에서 분리 필요
const MajorP = styled.p`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.font.body3};
  color: ${({ theme }) => theme.color.label.normal};
  background-color: ${({ theme }) => theme.color.palette.coolNeutral97};
  border: 1px solid ${({ theme }) => theme.color.palette.coolNeutral97};
  width: fit-content;
  height: 24px;
  border-radius: 6px;
  overflow: hidden;

  & > span {
    padding: 2px 4px;
  }

  & > span:last-of-type {
    margin-left: 2px;
    display: inline-block;
    border-radius: 5px;
    overflow: hidden;
    color: ${({ theme }) => theme.color.primary.normal};
    background-color: ${({ theme }) => theme.color.static.light};
  }

  ${({ theme }) => theme.mediaQuery.mobile} {
    ${({ theme }) => theme.font.caption2};
    height: 20px;
  }
`;

const TagP = styled.p`
  padding: 2px 4px;
  min-width: 29px;
  height: 18px;
  ${({ theme }) => theme.font.caption1}
  background: ${({ theme }) => theme.color.palette.coolNeutral97};
  border-radius: 4px;
  margin-right: 4px;
`;

const NicknameP = styled.p`
  ${({ theme }) => theme.font.caption1}
  color: ${({ theme }) => theme.color.label.normal};
`;

const CommentTextP = styled.p`
  ${({ theme }) => theme.font.body3}
  font-weight: 400;
  color: ${({ theme }) => theme.color.label.normal};
  margin: 8px 0 10px 0;
`;

const ModifyButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 28px;
  background: ${({ theme }) => theme.color.palette.deepSkyBlue99};
  border-radius: 8px;
  padding: 3px;
`;

const CommentCard = ({
  postId,
  postAuthorMajor,
  postRequestedMajor,
  postStatus,
  title,
  commentId,
  commentAuthorMajor,
  commentAuthorNickname,
  comment,
}: Props) => {
  const { openModal, closeModal } = useModal();
  const { mutateAsync: commentDeleteMutation } = useDeleteCommentMutation();
  const { refetch: historyRefetch } = useHistoryQuery({ historyType: 'ACTIVITY' });

  const handleDeleteClick = () => {
    openModal({
      modalProps: {
        contents: (
          <Modal.Confirm
            isReverseButton
            confirmLabel="삭제하기"
            cancelLabel="취소"
            onConfirm={async () => {
              const res = await commentDeleteMutation({
                postId: postId,
                commentId: commentId as number,
              });
              if (res.success) {
                await historyRefetch();
              }
              closeModal();
            }}
            onCancel={() => {
              closeModal();
            }}
          >
            정말 삭제하시겠습니까 ?
          </Modal.Confirm>
        ),
      },
    });
  };

  const handleModifyClick = () => {
    // TODO: 댓글 수정 버튼 클릭 시 처리 및 api 연동
  };

  return (
    <CommentCardWrapper>
      <PostAreaContainer>
        <MajorP>
          <span>{JOB_GROUP_LABELS[postAuthorMajor] ?? ''}</span>
          <span>
            {`>`}
            {JOB_GROUP_LABELS[postRequestedMajor] ?? ''}
          </span>
        </MajorP>
        <TitleP>
          <Image
            alt="답변 체크"
            src={`${IMAGE_CDN}/qna/CheckMarkButton${
              postStatus === 'COMPLETE' ? '_checked' : '_disable'
            }.png`}
            width={20}
            height={20}
          />
          {title}
        </TitleP>
      </PostAreaContainer>
      <CommentAreaContainer>
        <CommentAreaHeader>
          <div>
            <TagP>{JOB_GROUP_LABELS[commentAuthorMajor as string]}</TagP>
            <NicknameP>{commentAuthorNickname}</NicknameP>
          </div>
          <button onClick={handleDeleteClick}>
            <Image
              alt="삭제 아이콘"
              src={`${IMAGE_CDN}/icon/DeleteButton.png`}
              width={18}
              height={18}
            />
          </button>
        </CommentAreaHeader>
        <CommentTextP>{comment}</CommentTextP>
        <CommentAreaFooter>
          {/* TODO: 추천기능 개발시 수정 */}
          {/* TODO: 대댓글 count */}
          <CommentComp.ReactionCount recommendCount={1004} commentCount={30} />
          <ModifyButton onClick={handleModifyClick}>
            <Image
              alt="수정 아이콘"
              src={`${IMAGE_CDN}/icon/ModifyButton_active.png`}
              width={24}
              height={24}
            />
          </ModifyButton>
        </CommentAreaFooter>
      </CommentAreaContainer>
    </CommentCardWrapper>
  );
};

export default React.memo(CommentCard);
