'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { PostListItem } from '@/app/api/post/type';
import { PostSearchItemProps } from '@/app/api/post/search/type';
import usePostScrapQuery from '@/app/api/post/scrap/queries';
import useObserver from '@/app/hooks/useObserver';
import QuestionCard from './QuestionCard';
import SkeletonComp from './SkeletonComp';

interface ListBoxProps {
  list: PostListItem[] | PostSearchItemProps[];
  infiniteCallback?: () => void;
}

const ListWrapperUl = styled.ul`
  & > li {
    margin-bottom: 28px;
  }

  & > li:first-of-type {
    margin-top: 8px;
  }
`;

const ListBox = ({ list, infiniteCallback }: ListBoxProps) => {
  const { data: userScrapData } = usePostScrapQuery();

  const { observerRef } = useObserver(true, () => {
    if (infiniteCallback) infiniteCallback();
  });

  return (
    <ListWrapperUl>
      {list ? (
        list.map((post, idx) => {
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

          return idx === list.length - 1 ? (
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
  );
};

export default ListBox;
