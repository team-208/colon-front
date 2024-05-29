'use client';

import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import FilterHeaderComp from '@/app/components/common/FilterHeaderComp';
import SelectorComp from '../../common/SelectorComp';
import usePostListQuery from '@/app/api/post/queries';
import { PostListItem } from '@/app/api/post/type';
import { isEmpty } from 'lodash';
import QuestionCard from '../../common/QuestionCard';
import dayjs from 'dayjs';
import Link from 'next/link';

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

  const { data } = usePostListQuery('DATE_DESC');

  const chagneFilter = useCallback((idx: number) => {
    // TODO: filterMenu 따른 질문카드 영역 처리
  }, []);

  const changeSort = useCallback((idx: number) => {
    // TODO: sortMenu에 따른 질문카드 영역 처리
  }, []);

  useEffect(() => {
    if (isEmpty(postList) && data?.pages) {
      setPostList(data?.pages[0].list);
    }
  }, [data]);

  return (
    <>
      <FilterHeaderComp>
        <FilterHeaderComp.Menu idx={0} text="전체" clickEvent={chagneFilter} />
        <FilterHeaderComp.Menu idx={1} text="기획" clickEvent={chagneFilter} />
        <FilterHeaderComp.Menu idx={2} text="개발" clickEvent={chagneFilter} />
        <FilterHeaderComp.Menu idx={3} text="디자인" clickEvent={chagneFilter} />
      </FilterHeaderComp>
      <SelectorContainerDiv>
        <SelectorComp defaultOption={{ idx: 0, text: '최신순' }}>
          <SelectorComp.Option idx={0} text="최신순" clickEvent={changeSort} />
          <SelectorComp.Option idx={1} text="반응순" clickEvent={changeSort} />
          <SelectorComp.Option idx={2} text="답변순" clickEvent={changeSort} />
          <SelectorComp.Option idx={3} text="스크랩순" clickEvent={changeSort} />
        </SelectorComp>
      </SelectorContainerDiv>
      {/* 질문카드 영역 */}

      <ListWrapperUl>
        {postList.map((post) => {
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
          return (
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
