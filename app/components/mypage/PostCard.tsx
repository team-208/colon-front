'use client';

import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { ReactNode } from 'react';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import PostComp from '../common/PostComp';
import Modal from '../common/ModalComp';
import useModal from '@/app/hooks/useModal';
import { HistoryPost } from '@/app/api/auth/history/type';
import { useDeletePostMutation } from '@/app/api/post/[id]/mutations';
import useHistoryQuery from '@/app/api/auth/history/queries';

interface Props extends HistoryPost {
  isDelete?: boolean;
  reaction?: string;
  children: ReactNode;
}

const PostCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px 10px;
  background: ${({ theme }) => theme.color.static.light};
  border: 1px solid ${({ theme }) => theme.color.palette.coolNeutral97};
  box-shadow: 0px 1px 10px -3px rgba(126, 145, 157, 0.15);
  border-radius: 8px;
  margin: 0 20px;
`;

const PostCardHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PostCardContent = styled.div`
  margin: 10px 0;
`;

const PostCardFooter = styled.div`
  position: relative;
  min-height: 28px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NicknameP = styled.p`
  ${({ theme }) => theme.font.caption1}
  font-weight: 700;
  color: ${({ theme }) => theme.color.label.normal};
  margin-left: 6px;
`;

const TitleP = styled.p`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.font.body1}
  color: ${({ theme }) => theme.color.label.normal};
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  img {
    margin-right: 8px;
  }
`;

const PreviewBodyP = styled.p`
  ${({ theme }) => theme.font.body2}
  font-weight: 400;
  color: #333438;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

const PostCard = ({
  postId,
  title,
  postStatus,
  previewBody,
  postAuthorMajor,
  authorNickname,
  postRequestedMajor,
  children,
  isDelete,
}: Props) => {
  const { openModal, closeModal } = useModal();
  const { mutateAsync: postDeleteMutation } = useDeletePostMutation();
  const { refetch: historyRefetch } = useHistoryQuery({ historyType: 'ACTIVITY' });

  const handleDeleteClick = async () => {
    openModal({
      modalProps: {
        contents: (
          <Modal.Confirm
            isReverseButton
            confirmLabel="삭제하기"
            cancelLabel="취소"
            onConfirm={async () => {
              const res = await postDeleteMutation(postId);
              if (res.success) {
                await historyRefetch();
              }
              closeModal();
            }}
            onCancel={() => {
              closeModal();
            }}
          >
            글을 삭제하시면
            <br />
            글, 반응, 댓글 모두 사라져요.
          </Modal.Confirm>
        ),
      },
    });
  };

  return (
    <PostCardContainer>
      <PostCardHeader>
        <PostComp.MajorBox authorMajor={postAuthorMajor} requestedMajor={postRequestedMajor} />
        {postStatus === 'COMPLETE' && <NicknameP>{authorNickname}</NicknameP>}
        {isDelete && (
          <DeleteButton onClick={handleDeleteClick}>
            <Image
              alt="삭제 아이콘"
              src={`${IMAGE_CDN}/icon/DeleteButton.png`}
              width={18}
              height={18}
            />
          </DeleteButton>
        )}
      </PostCardHeader>
      <PostCardContent>
        <TitleP>
          <Image
            alt="답변 체크"
            src={`${IMAGE_CDN}/qna/${
              postStatus === 'COMPLETE' ? 'CheckMarkButton_checked' : 'EmojiSpeechBubble'
            }.png`}
            width={20}
            height={20}
          />
          {title}
        </TitleP>
        <PreviewBodyP>{previewBody}</PreviewBodyP>
      </PostCardContent>
      <PostCardFooter>{children}</PostCardFooter>
    </PostCardContainer>
  );
};

export default React.memo(PostCard);
