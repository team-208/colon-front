'use client';

import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import FilterHeader from '@/app/components/common/FilterHeader';
import Selector from '../../common/Selector';
import { GetPostListQuery, PostListItem, PostListOrderTypes } from '@/app/api/post/type';
import ListBox from '../../common/ListBox';
import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import usePostListQuery from '@/app/api/post/queries';
import useObserver from '@/app/hooks/useObserver';
import { GetPostResponse } from '@/app/api/post/[id]/type';

const SelectorContainerDiv = styled.div`
  width: 100%;
  height: 28px;
  padding: 0 20px;

  > * {
    float: right;
    line-height: 28px;
  }
`;

const QnaListComp = () => {
  const [postList, setPostList] = useState<PostListItem[]>([]);
  const [filter, setFilter] = useState<Omit<GetPostListQuery, 'offset'>>({
    order: 'DATE_DESC',
    major: 'ALL',
  });

  const { data, fetchNextPage } = usePostListQuery(filter);

  const infinitePaging = async () => {
    await fetchNextPage();
  };

  const chagneFilter = useCallback((major: JOB_GROUP_TYPES) => {
    setFilter((prev) => ({ ...prev, major }));
  }, []);

  const changeOrder = useCallback((order: PostListOrderTypes) => {
    setFilter((prev) => ({ ...prev, order }));
  }, []);

  useEffect(() => {
    if (data?.pages) {
      setPostList((v) => {
        const list: PostListItem[] = [];

        data?.pages.forEach((v) => {
          list.push(...v.list);
        });

        return list;
      });
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
          <Selector.Option idx={0} text="최신순" clickEvent={() => changeOrder('DATE_DESC')} />
          <Selector.Option idx={1} text="반응순" clickEvent={() => changeOrder('REACTION_DESC')} />
          <Selector.Option idx={2} text="답변순" clickEvent={() => changeOrder('COMMENT_DESC')} />
          <Selector.Option idx={3} text="스크랩순" clickEvent={() => changeOrder('SCRAP_DESC')} />
        </Selector>
      </SelectorContainerDiv>

      <ListBox list={postList} infiniteCallback={infinitePaging} />
    </>
  );
};

export default QnaListComp;
