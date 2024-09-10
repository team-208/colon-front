'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import PostComp from '../common/PostComp';
import CommentCard from './CommentCard';
import PostCard from './PostCard';
import { HistoryItemProps } from '@/app/api/auth/history/type';

type Props = {
  list: Array<HistoryItemProps>;
};

const FilterListLayoutDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 25px;
  margin: 16px 0 !important;
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
    value: 'ALL',
  },
  {
    text: '글',
    value: 'POST',
  },
  {
    text: '댓글',
    value: 'COMMENT',
  },
  {
    text: '임시저장',
    value: 'EDITING',
  },
];

const ActivityContentInner = (props: Props) => {
  const { list } = props;
  const [filter, setFilter] = useState<string>(filterList[0].value);
  const [filteredList, setFilteredList] = useState<Array<HistoryItemProps>>([]);

  const { push } = useRouter();

  const handleModifyClick = (id: number) => {
    push(`qna/${id}/modify`);
  };

  useEffect(() => {
    switch (filter) {
      case 'POST':
        setFilteredList(
          list.filter(({ type, post }) => type === filter && post.postStatus === 'COMPLETE'),
        );
        break;
      case 'COMMENT':
        setFilteredList(list.filter(({ type }) => type === filter));
        break;
      case 'EDITING':
        setFilteredList(list.filter(({ post }) => post.postStatus === filter));
        break;
      case 'ALL':
      default:
        setFilteredList(list);
        break;
    }
  }, [list, filter]);

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

      {filteredList.map((v) => {
        const { type, post, comment } = v;
        return type === 'POST' ? (
          <PostCard key={`post-${post.postId}`} {...post} isDelete>
            {post.postStatus === 'COMPLETE' && (
              <PostComp.CountBox
                postId={post.postId}
                reactionCountObj={{
                  ThumbsUp: 1,
                  Pushpin: 2,
                  FaceWithMonocle: 3,
                  ExplodingHead: 4,
                  SmilingHeart: 5,
                }}
                reactionDisabled
                commentCount={3}
              />
            )}

            <ModifyButton onClick={() => handleModifyClick(post.postId)}>
              <Image
                alt="수정 아이콘"
                src={`${IMAGE_CDN}/icon/ModifyButton_active.png`}
                width={24}
                height={24}
              />
            </ModifyButton>
          </PostCard>
        ) : (
          <CommentCard key={`comment-${comment?.commentId}`} {...comment} {...post} />
        );
      })}
    </>
  );
};

export default ActivityContentInner;
