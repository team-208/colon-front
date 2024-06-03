'use client';

import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { JOB_GROUP_LABELS } from '../common/constants';
import { UserComment } from '../type';
import CommentComp from '../common/CommentComp';
import { IMAGE_CDN } from '@/app/constants/externalUrls';

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
  width: 29px;
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
  comment,
  postInfo,
  recommend_count,
  comment_count,
  author_major,
  author_nickname,
}: UserComment) => {
  const handleDeleteClick = () => {
    // TODO: 댓글 삭제 api 연동
  };

  const handleModifyClick = () => {
    // TODO: 댓글 수정 버튼 클릭 시 처리 및 api 연동
  };

  return (
    <CommentCardWrapper>
      <PostAreaContainer>
        <MajorP>
          <span>{JOB_GROUP_LABELS[postInfo.author_major] ?? ''}</span>
          <span>
            {`>`}
            {JOB_GROUP_LABELS[postInfo.requestedMajor] ?? ''}
          </span>
        </MajorP>
        <TitleP>
          <Image
            alt="답변 체크"
            src={`${IMAGE_CDN}/qna/CheckMarkButton${
              postInfo.status === 'COMPLETE' ? '_checked' : '_disable'
            }.png`}
            width={20}
            height={20}
          />
          {postInfo.title}
        </TitleP>
      </PostAreaContainer>
      <CommentAreaContainer>
        <CommentAreaHeader>
          <div>
            <TagP>{JOB_GROUP_LABELS[author_major]}</TagP>
            <NicknameP>{author_nickname}</NicknameP>
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
          <CommentComp.ReactionCount
            recommendCount={recommend_count}
            commentCount={comment_count}
          />
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
