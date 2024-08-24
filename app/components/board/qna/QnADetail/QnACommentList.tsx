'use client';

import useCommentsQuery from '@/app/api/comment/[postId]/queries';
import useAuth from '@/app/hooks/useAuth';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import Selector from '@/app/components/common/Selector';
import { isEmpty } from 'lodash';
import { GetCommentsResponseItem } from '@/app/api/comment/[postId]/type';
import Section from '@/app/components/common/Section';
import QnACommentWrite from './QnACommentWrite';
import AcceptCommentItem from './AcceptCommentItem';

interface Props {
  postId: string;
  acceptedCommentId: number[];
  postAuthor: string;
}

const AcceptCommentListWrapperUl = styled.ul`
  border: 1px solid ${({ theme }) => theme.color.line.solid.neutral};
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  max-width: 700px;
  margin: 32px auto 24px;

  & > li:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.color.line.solid.neutral};
  }
`;

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

const QnACommentList = ({ postId, acceptedCommentId = [], postAuthor }: Props) => {
  const [commentList, setCommentList] = useState<GetCommentsResponseItem[]>([]);
  const [openedNestedComment, setOpenedNestedComment] = useState<{
    isOpen: boolean;
    commentId: number;
  }>({ isOpen: false, commentId: -1 });

  const { data } = useCommentsQuery(postId);

  const { userInfo } = useAuth();

  const isAuthor = useMemo(() => postAuthor === userInfo?.user?.nick_name, [userInfo]);
  const acceptCommentList = useMemo(
    () => data?.filter((item) => acceptedCommentId?.includes(item.id)),
    [data],
  );

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

  const handleChangeNestedCommentVisible = useCallback(
    (isOpen: boolean, commentId: number) => {
      setOpenedNestedComment({ isOpen, commentId });
    },
    [setOpenedNestedComment],
  );

  useEffect(() => {
    if (data && !isEmpty(data) && isEmpty(commentList)) {
      setCommentList(data);
    }
  }, [data]);

  return (
    <>
      {acceptCommentList && (
        <Section direction="column" padding="0">
          <AcceptCommentListWrapperUl>
            {acceptCommentList?.map(
              ({
                id,
                author_nickname,
                created_at,
                updated_at,
                comment,
                author_major,
                reaction_count,
                nestedComments,
              }) => {
                return (
                  <li>
                    <AcceptCommentItem
                      postId={postId}
                      commentId={id}
                      authorMajor={author_major}
                      authorNickName={author_nickname}
                      updatedAt={updated_at || created_at}
                      isSelected={acceptedCommentId?.includes(id)}
                      comment={comment}
                      likeCount={reaction_count}
                      nestedCommentCount={nestedComments?.length ?? 0}
                    />
                  </li>
                );
              },
            )}
          </AcceptCommentListWrapperUl>
        </Section>
      )}

      <Section direction="column" padding="0">
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
                const isAuthorComment = userInfo?.user?.nick_name === author_nickname;
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
                        isSelected={acceptedCommentId?.includes(id)}
                        comment={comment}
                        isVisibleChoice={
                          isAuthor &&
                          !isAuthorComment &&
                          (!acceptedCommentId || acceptedCommentId?.length < 3)
                        }
                        likeCount={reaction_count}
                        nestedCommentCount={nestedComments?.length ?? 0}
                        isOpenNestedCommentWrite={
                          openedNestedComment.isOpen && openedNestedComment.commentId === id
                        }
                        onChangeNestedCommentVisible={(isOpen) => {
                          handleChangeNestedCommentVisible(isOpen, id);
                        }}
                      />
                    </li>
                    {nestedComments?.map((item, idx) => {
                      const isAuthorNestedComment =
                        userInfo?.user?.nick_name === item.author_nickname;
                      return (
                        <li key={`nested-comment-item-${item.id}`}>
                          <CommentItem
                            postId={postId}
                            commentId={item.id}
                            isNestedComment
                            authorMajor={item.author_major}
                            authorNickName={item.author_nickname}
                            updatedAt={item.updated_at || item.created_at}
                            isSelected={acceptedCommentId?.includes(item.id)}
                            comment={item.comment}
                            isVisibleChoice={
                              isAuthor &&
                              !isAuthorNestedComment &&
                              (!acceptedCommentId || acceptedCommentId?.length < 3)
                            }
                            likeCount={item.reaction_count}
                            isOpenNestedCommentWrite={
                              openedNestedComment.isOpen &&
                              openedNestedComment.commentId === item.id
                            }
                            onChangeNestedCommentVisible={(isOpen) => {
                              handleChangeNestedCommentVisible(isOpen, item.id);
                            }}
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
      </Section>

      {!openedNestedComment.isOpen && (
        <Section direction="column" padding="0">
          <QnACommentWrite postId={postId} />
        </Section>
      )}
    </>
  );
};

export default QnACommentList;
