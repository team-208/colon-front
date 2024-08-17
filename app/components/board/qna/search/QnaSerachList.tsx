'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { PostSearchItemProps } from '@/app/api/post/search/type';
import useObserver from '@/app/hooks/useObserver';
import usePostSearchQuery from '@/app/api/post/search/queries';
import Selector from '@/app/components/common/Selector';
import usePostScrapQuery from '@/app/api/post/scrap/queries';
import QuestionCard from '@/app/components/common/QuestionCard';
import SkeletonComp from '@/app/components/common/SkeletonComp';

const ListWrapperUl = styled.ul`
  & > li {
    margin-bottom: 28px;
  }

  & > li:first-of-type {
    margin-top: 8px;
  }
`;

const HeaderContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 16px 20px;

  p {
    ${({ theme }) => theme.font.body2}
    color: ${({ theme }) => theme.color.label.normal};
    font-weight: 400;
  }
`;

const QnaSerachList = () => {
  const searchParams = useSearchParams();
  const param = searchParams.get('word');

  const [posts, setPosts] = useState<PostSearchItemProps[]>([]);
  const [comments, setComments] = useState<PostSearchItemProps[]>([]);

  const { data } = usePostSearchQuery(param as string);
  const { data: userScrapData } = usePostScrapQuery();

  const { observerRef } = useObserver(true, () => {
    // TODO: Infinity scroll 구현
  });

  const changeSort = useCallback((idx: number) => {
    // TODO: sortMenu에 따른 질문카드 영역 처리
  }, []);

  useEffect(() => {
    if (data) {
      setPosts(data?.posts);
      setComments(data?.comments);
    }
  }, [data]);

  return (
    <>
      <HeaderContainerDiv>
        <p>
          검색결과 댓글 {'{' + comments.length + '}'}건 글 {'{' + posts.length + '}'}건
        </p>
        <Selector defaultOption={{ idx: 0, text: '최신순' }}>
          <Selector.Option idx={0} text="최신순" clickEvent={changeSort} />
          <Selector.Option idx={1} text="반응순" clickEvent={changeSort} />
          <Selector.Option idx={2} text="답변순" clickEvent={changeSort} />
          <Selector.Option idx={3} text="스크랩순" clickEvent={changeSort} />
        </Selector>
      </HeaderContainerDiv>

      <ListWrapperUl>
        {data ? (
          posts.map((post, idx) => {
            const {
              id,
              status,
              requested_major,
              title,
              body,
              preview_body,
              tags,
              created_at,
              updated_at,
              author_nickname,
              author_major,
              author_profile_url,
              reactions,
              comments_count,
              accept_comment_id,
            } = post;

            const isScrap = userScrapData?.list.find((item) => item.post_id === id);

            return idx === posts.length - 1 ? (
              <li key={`post-list-item-${post.id}`}>
                <div ref={observerRef}>
                  <Link href={`/qna/${post.id}`}>
                    <QuestionCard
                      id={id}
                      status={status}
                      requested_major={requested_major}
                      title={title}
                      body={body}
                      preview_body={preview_body}
                      tags={tags}
                      created_at={created_at}
                      updated_at={updated_at}
                      author_nickname={author_nickname}
                      author_major={author_major}
                      author_profile_url={author_profile_url}
                      reactions={JSON.parse(reactions)}
                      comments_count={comments_count}
                      accept_comment_id={accept_comment_id}
                      isScrap={!!isScrap}
                    />
                  </Link>
                </div>
              </li>
            ) : (
              <li key={`post-list-item-${post.id}`}>
                <Link href={`/qna/${post.id}`}>
                  <QuestionCard
                    id={id}
                    status={status}
                    requested_major={requested_major}
                    title={title}
                    body={body}
                    preview_body={preview_body}
                    tags={tags}
                    created_at={created_at}
                    updated_at={updated_at}
                    author_nickname={author_nickname}
                    author_major={author_major}
                    author_profile_url={author_profile_url}
                    reactions={JSON.parse(reactions)}
                    comments_count={comments_count}
                    accept_comment_id={accept_comment_id}
                    isScrap={!!isScrap}
                  />
                </Link>
              </li>
            );
          })
        ) : (
          <SkeletonComp.ListBoxUI />
        )}
      </ListWrapperUl>
    </>
  );
};

export default QnaSerachList;
