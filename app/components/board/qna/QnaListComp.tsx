'use client';

import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import FilterHeader from '@/app/components/common/FilterHeader';
import Selector from '../../common/Selector';
import usePostListQuery from '@/app/api/post/queries';
import { GetPostListQuery, PostListItem } from '@/app/api/post/type';
import QuestionCard from '../../common/QuestionCard';
import Link from 'next/link';
import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import usePostScrapQuery from '@/app/api/post/scrap/queries';
import useObserver from '@/app/hooks/useObserver';

const SelectorContainerDiv = styled.div`
  width: 100%;
  height: 28px;
  padding: 0 20px;

  > * {
    float: right;
    line-height: 28px;
  }
`;

const ListWrapperUl = styled.ul`
  & > li {
    margin-bottom: 28px;
  }

  & > li:first-of-type {
    margin-top: 8px;
  }
`;

const QnaListComp = () => {
  const [postList, setPostList] = useState<PostListItem[]>([]);
  const [filter, setFilter] = useState<Omit<GetPostListQuery, 'offset'>>({
    order: 'DATE_DESC',
    major: 'ALL',
  });

  const { data } = usePostListQuery(filter);
  const { data: userScrapData } = usePostScrapQuery();
  const { observerRef } = useObserver(true, () => {
    // TODO: Infinity scroll 구현
  });

  const chagneFilter = useCallback((major: JOB_GROUP_TYPES) => {
    setFilter((prev) => ({ ...prev, major }));
  }, []);

  const changeSort = useCallback((idx: number) => {
    // TODO: sortMenu에 따른 질문카드 영역 처리
  }, []);

  useEffect(() => {
    if (data?.pages) {
      setPostList(data?.pages[0].list);
    }
  }, [data]);

  return (
    <>
      <FilterHeader>
        <FilterHeader.Menu idx={0} text="전체" clickEvent={() => chagneFilter('ALL')} />
        <FilterHeader.Menu idx={1} text="기획" clickEvent={() => chagneFilter('PLANNING')} />
        <FilterHeader.Menu idx={2} text="개발" clickEvent={() => chagneFilter('DEVELOP')} />
        <FilterHeader.Menu idx={3} text="디자인" clickEvent={() => chagneFilter('DESIGN')} />
      </FilterHeader>
      <SelectorContainerDiv>
        <Selector defaultOption={{ idx: 0, text: '최신순' }}>
          <Selector.Option idx={0} text="최신순" clickEvent={changeSort} />
          <Selector.Option idx={1} text="반응순" clickEvent={changeSort} />
          <Selector.Option idx={2} text="답변순" clickEvent={changeSort} />
          <Selector.Option idx={3} text="스크랩순" clickEvent={changeSort} />
        </Selector>
      </SelectorContainerDiv>
      {/* 질문카드 영역 */}

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
    </>
  );
};

export default QnaListComp;
