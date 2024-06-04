'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserPost, UserComment } from '../type';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import PostComp from '../common/PostComp';
import CommentCard from './CommentCard';
import PostCard from './PostCard';

const FilterListLayoutDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 25px;
  margin: 16px 0;
`;

const FilterListButton = styled.button<{ $isActive: boolean }>`
  min-width: 60px;
  padding: 4px 8px;
  ${({ theme }) => theme.font.body3}
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.color.primary.normal : theme.color.palette.coolNeutral99};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.color.static.light : theme.color.interaction.inactive};
  border-radius: 8px;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const ModifyButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-items: center;
  align-items: center;
  width: 32px;
  height: 28px;
  background: ${({ theme }) => theme.color.palette.deepSkyBlue99};
  border-radius: 8px;
  padding: 2px 4px;
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
  {
    text: '임시저장',
    value: 'temp_post',
  },
];

type Props = {
  list: Array<UserPost | UserComment>;
};

const ActivityContentInner = (props: Props) => {
  const { list } = props;
  const [filter, setFilter] = useState<string>(filterList[0].value);
  const [filteredList, setFilteredList] = useState<Array<UserPost | UserComment>>([]);

  const { push } = useRouter();

  const handleModifyClick = (id: number) => {
    push(`qna/${id}/modify`);
  };

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
        v.type === 'post' || v.type === 'temp_post' ? (
          <PostCard key={`post-${idx}`} {...(v as UserPost)} isDelete>
            {v.type === 'post' && <PostComp.ReactionCount emojiCount={999} commentCount={3} />}

            {/* TODO: post.id로 변경 */}
            <ModifyButton onClick={() => handleModifyClick(10)}>
              <Image
                alt="수정 아이콘"
                src={`${IMAGE_CDN}/icon/ModifyButton_active.png`}
                width={24}
                height={24}
              />
            </ModifyButton>
          </PostCard>
        ) : (
          <CommentCard key={`comment-${idx}`} {...(v as UserComment)} />
        ),
      )}
    </>
  );
};

export default ActivityContentInner;
