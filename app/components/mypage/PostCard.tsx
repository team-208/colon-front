'use client';

import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { JOB_GROUP_LABELS } from '../common/constants';
import { Post } from '@/app/types/data';
import { ReactNode } from 'react';
import { IMAGE_CDN } from '@/app/constants/externalUrls';

interface Props extends Post {
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

const NicknameP = styled.p`
  ${({ theme }) => theme.font.caption1}
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
  title,
  status,
  previewBody,
  author_major,
  author_nickname,
  requestedMajor,
  children,
  isDelete,
}: Props) => {
  const handleDeleteClick = () => {
    // TODO: post 삭제 api 연동
  };

  return (
    <PostCardContainer>
      <PostCardHeader>
        <MajorP>
          <span>{JOB_GROUP_LABELS[author_major] ?? ''}</span>
          <span>
            {`>`}
            {JOB_GROUP_LABELS[requestedMajor] ?? ''}
          </span>
        </MajorP>
        {status === 'COMPLETE' && <NicknameP>{author_nickname}</NicknameP>}
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
              status === 'COMPLETE' ? 'CheckMarkButton_checked' : 'EmojiSpeechBubble'
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
