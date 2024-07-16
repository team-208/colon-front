'use client';

import useCommentsQuery from '@/app/api/comment/[postId]/queries';
import useAuth from '@/app/hooks/useAuth';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import Selector from '@/app/components/common/Selector';
import { isEmpty } from 'lodash';
import { GetCommentsResponseItem } from '@/app/api/comment/[postId]/type';

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

const QnACommentList = ({ postId, acceptedCommentId, postAuthor }: Props) => {
  const [commentList, setCommentList] = useState<GetCommentsResponseItem[]>([]);

  const { data } = useCommentsQuery(postId);

  const { userInfo } = useAuth();

  const isAuthor = useMemo(() => postAuthor === userInfo?.user.nick_name, [userInfo]);

  const handleSortList = useCallback(
    (type: 'updated' | 'reaction') => {
      const nextList = [...commentList];

      if (type === 'updated') {
        nextList.sort((_prev, _next) => (_prev.id > _next.id ? 1 : -1));
      }

      if (type === 'reaction') {
        nextList.sort((_prev, _next) => (_prev.reaction_count > _next.reaction_count ? -1 : 1));
      }

      setCommentList(nextList);
    },
    [commentList],
  );

  useEffect(() => {
    if (data && !isEmpty(data) && isEmpty(commentList)) {
      setCommentList(data);
    }
  }, [data]);

  return (
    <ConatinerDiv>
      <FilterDiv>
        <TitleP>댓글</TitleP>
        <Selector defaultOption={{ idx: 0, text: '정렬' }}>
          <Selector.Option
            idx={0}
            text="시간순"
            clickEvent={() => {
              handleSortList('updated');
            }}
          />
          <Selector.Option
            idx={1}
            text="반응순"
            clickEvent={() => {
              handleSortList('reaction');
            }}
          />
        </Selector>
      </FilterDiv>

      <ul>
        {commentList?.map(
          ({
            id,
            author_nickname,
            created_at,
            updated_at,
            comment,
            original_comment,
            nestedComments,
            author_major,
            reaction_count,
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
                    likeCount={reaction_count}
                    nestedCommentCount={nestedComments?.length ?? 0}
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
                        likeCount={item.reaction_count}
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
