'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GetPostListQuery, PostListItem } from '@/app/api/post/type';
import usePostScrapQuery from '@/app/api/post/scrap/queries';
import usePostListQuery from '@/app/api/post/queries';
import useObserver from '@/app/hooks/useObserver';
import QuestionCard from '../../common/QuestionCard';

interface ListBoxProps {
  filter: Omit<GetPostListQuery, 'offset'>;
}

const ListWrapperUl = styled.ul`
  & > li {
    margin-bottom: 28px;
  }

  & > li:first-of-type {
    margin-top: 8px;
  }
`;

const ListBox = async ({ filter }: ListBoxProps) => {
  const [postList, setPostList] = useState<PostListItem[]>([]);

  const { data } = usePostListQuery(filter);
  const { data: userScrapData } = usePostScrapQuery();

  const { observerRef } = useObserver(true, () => {
    // TODO: Infinity scroll 구현
  });

  useEffect(() => {
    if (data?.pages) {
      setPostList(data?.pages[0].list);
    }
  }, [data]);

  return (
    <ListWrapperUl>
      {postList.map((post, idx) => {
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
        } = post;

        const isScrap = userScrapData?.list.find((item) => item.post_id === id);

        return idx === postList.length - 1 ? (
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
                isScrap={!!isScrap}
              />
            </Link>
          </li>
        );
      })}
    </ListWrapperUl>
  );
};

export default ListBox;
