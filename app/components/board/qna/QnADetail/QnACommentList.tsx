'use client';

import useCommentsQuery from '@/app/api/comment/[postId]/queries';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import useAuth from '@/app/hooks/useAuth';
import Image from 'next/image';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';

interface Props {
  postId: string;
  acceptedCommentId: number;
  postAuthor: string;
}

const ConatinerDiv = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
`;

const FilterDiv = styled.div`
  margin: 12px 0 6px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
`;

const TitleP = styled.p`
  ${({ theme }) => theme.font.body2};
`;

const SelectButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  padding: 4px 8px;
  ${({ theme }) => theme.font.body3};

  & > span {
    margin-right: 4px;
  }
`;

const QnACommentList = ({ postId, acceptedCommentId, postAuthor }: Props) => {
  const { data } = useCommentsQuery(postId);

  const { userInfo } = useAuth();

  const isAuthor = useMemo(() => postAuthor === userInfo?.user.nick_name, [userInfo]);

  return (
    <ConatinerDiv>
      <FilterDiv>
        <TitleP>댓글</TitleP>
        {/* TODO: selector 컴포넌트 제작 필요 */}
        <SelectButton>
          <span>정렬</span>
          <Image
            alt="정렬 아이콘"
            src={`${IMAGE_CDN}/icon/chevron-down.png`}
            width={8}
            height={4.5}
          />
        </SelectButton>
      </FilterDiv>

      <ul>
        {data?.map(
          ({
            id,
            author_nickname,
            created_at,
            updated_at,
            comment,
            original_comment,
            nestedComments,
            author_major,
          }) => {
            const isAuthorComment = userInfo?.user.nick_name === author_nickname;
            return (
              <React.Fragment key={`comment-item-${id}`}>
                <li>
                  <CommentItem
                    postId={postId}
                    commentId={id}
                    isNestedComment={!!original_comment}
                    authorMajor={author_major}
                    authorNickName={author_nickname}
                    updatedAt={updated_at || created_at}
                    isSelected={acceptedCommentId === id}
                    comment={comment}
                    isVisibleChoice={isAuthor && !isAuthorComment && !acceptedCommentId}
                  />
                </li>
                {nestedComments?.map((item, idx) => {
                  const isAuthorNestedComment = userInfo?.user.nick_name === item.author_nickname;
                  return (
                    <li key={`nested-comment-item-${item.id}`}>
                      <CommentItem
                        postId={postId}
                        commentId={item.id}
                        isNestedComment
                        authorMajor={item.author_major}
                        authorNickName={item.author_nickname}
                        updatedAt={item.updated_at || item.created_at}
                        isSelected={acceptedCommentId === item.id}
                        comment={item.comment}
                        isVisibleChoice={isAuthor && !isAuthorNestedComment && !acceptedCommentId}
                      />
                    </li>
                  );
                })}
              </React.Fragment>
            );
          },
        )}
      </ul>
    </ConatinerDiv>
  );
};

export default QnACommentList;
