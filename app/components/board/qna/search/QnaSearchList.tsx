'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { PostSearchItemProps } from '@/app/api/post/search/type';
import usePostSearchQuery from '@/app/api/post/search/queries';
import Selector from '@/app/components/common/Selector';
import ListBox from '../../../common/ListBox';
import NoSearchBox from '@/app/components/common/NoSearchBox';
import usePostScrapQuery from '@/app/api/post/scrap/queries';

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

const QnaSearchList = () => {
  const searchParams = useSearchParams();
  const param = searchParams.get('word');

  const [posts, setPosts] = useState<PostSearchItemProps[]>([]);
  const [comments, setComments] = useState<PostSearchItemProps[]>([]);

  const { data } = usePostSearchQuery(param as string);

  const changeSort = useCallback((idx: number) => {
    // TODO: sortMenu에 따른 질문카드 영역 처리
  }, []);

  useEffect(() => {
    if (data) {
      // setPosts(data?.posts);
      // setComments(data?.comments);
    }
  }, [data]);

  return (
    <>
      {posts.length > 0 ? (
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

          <ListBox list={posts} />
        </>
      ) : (
        <NoSearchBox word={param || ''} />
      )}
    </>
  );
};

export default QnaSearchList;
