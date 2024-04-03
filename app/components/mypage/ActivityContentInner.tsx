'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { UserPost, UserComment } from '../type';
import PostComp from '../common/PostComp';
import CommentComp from '../common/CommentComp';

const FilterListLayoutDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const FilterListButton = styled.button<{ $isActive: boolean }>`
  font-size: 20px;
  padding: 8px 10px;
  border-radius: 8px;
  background-color: ${({ $isActive }) => ($isActive ? '#c3c3c3' : 'white')};
  border: 1px solid #c3c3c3;

  &:not(:last-child) {
    margin-right: 14px;
  }
`;

const filterList = [
  {
    text: '전체',
    value: 'all',
  },
  {
    text: '글',
    value: 'post',
  },
  {
    text: '댓글',
    value: 'comment',
  },
];

type Props = {
  list: Array<UserPost | UserComment>;
};

const ActivityContentInner = (props: Props) => {
  const { list } = props;
  const [filter, setFilter] = useState<string>(filterList[0].value);
  const [filteredList, setFilteredList] = useState<Array<UserPost | UserComment>>([]);

  useEffect(() => {
    switch (filter) {
      case 'all':
        setFilteredList(list);
        break;
      default:
        setFilteredList(list.filter((v) => v.type === filter));
        break;
    }
  }, [filter]);

  return (
    <>
      <FilterListLayoutDiv>
        {filterList.map((v, idx) => (
          <FilterListButton
            key={`filter-${idx}`}
            $isActive={filter === v.value}
            onClick={() => setFilter(v.value)}
          >
            {v.text}
          </FilterListButton>
        ))}
      </FilterListLayoutDiv>

      {filteredList.map((v, idx) =>
        v.type === 'post' ? (
          <PostComp key={`post-${idx}`} {...(v as UserPost)} isModify />
        ) : (
          <CommentComp key={`comment-${idx}`} {...(v as UserComment)} isDelete />
        ),
      )}
    </>
  );
};

export default ActivityContentInner;
