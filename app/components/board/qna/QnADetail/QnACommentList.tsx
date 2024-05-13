'use client';

import { JOB_GROUP_TYPES } from '@/app/api/auth/user/type';
import useCommentsQuery from '@/app/api/comment/[postId]/queries';
import CommentComp from '@/app/components/common/CommentComp';
import { IMAGE_CDN } from '@/app/constants/externalUrls';
import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

interface Props {
  postId: string;
  acceptedCommentId: number;
}

const ConatinerDiv = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
`;

const FilterDiv = styled.div`
  margin: 12px 0 6px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
`;

const TitleP = styled.p`
  ${({ theme }) => theme.font.body2};
`;

const SelectButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  padding: 4px 8px;
  ${({ theme }) => theme.font.body3};

  & > span {
    margin-right: 4px;
  }
`;

const CommentP = styled.p`
  ${({ theme }) => theme.font.body2};
  font-weight: 400;
  color: ${({ theme }) => theme.color.label.normal};
  margin: 6px 0 10px;
`;

const commentList = [
  {
    id: 1,
    major: 'DEVELOP',
    nickname: '사용자 닉네임',
    updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    comment:
      '개발 공부를 하면서 이런 유용한 정보를 얻을 수 있다니 정말 좋아요! 반응 남기고 갑니다~',
    isNestedComment: false,
    isSelected: true,
  },
  {
    id: 2,
    major: 'DEVELOP',
    nickname: '사용자 닉네임',
    updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    comment:
      '개발 공부를 하면서 이런 유용한 정보를 얻을 수 있다니 정말 좋아요! 반응 남기고 갑니다~',
    isNestedComment: true,
  },
  {
    id: 3,
    major: 'DEVELOP',
    nickname: '사용자 닉네임',
    updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    comment:
      '개발 공부를 하면서 이런 유용한 정보를 얻을 수 있다니 정말 좋아요! 반응 남기고 갑니다~',
    isNestedComment: false,
  },
];

const emojis = {
  thumbsUp: 2,
  smilingHeart: 4,
  heart: 0,
};

const QnACommentList = ({ postId, acceptedCommentId }: Props) => {
  const { data } = useCommentsQuery(postId);

  return (
    <ConatinerDiv>
      <FilterDiv>
        <TitleP>댓글</TitleP>
        {/* TODO: selector 컴포넌트 제작 필요 */}
        <SelectButton>
          <span>정렬</span>
          <Image
            alt="정렬 아이콘"
            src={`${IMAGE_CDN}/icon/chevron-down.png`}
            width={8}
            height={4.5}
          />
        </SelectButton>
      </FilterDiv>

      <ul>
        {data?.map(
          ({
            id,
            author_nickname,
            created_at,
            updated_at,
            comment,
            original_comment,
            nestedComments,
          }) => {
            return (
              <React.Fragment key={`comment-item-${id}`}>
                <li>
                  <CommentComp.Wrapper isNestedComment={!!original_comment}>
                    <CommentComp.Header
                      // TODO: 작성자 직군 column 추가 필요
                      major={'DEVELOP'}
                      nickname={author_nickname}
                      updatedAt={updated_at || created_at}
                      isSelected={acceptedCommentId === id}
                    />
                    <CommentP>{comment}</CommentP>
                    <CommentComp.Emojis emojis={emojis} />
                  </CommentComp.Wrapper>
                </li>
                {nestedComments?.map((item, idx) => (
                  <li key={`nested-comment-item-${item.id}`}>
                    <CommentComp.Wrapper isNestedComment={true}>
                      <CommentComp.Header
                        // TODO: 작성자 직군 column 추가 필요
                        major={'DEVELOP'}
                        nickname={item.author_nickname}
                        updatedAt={item.updated_at || item.created_at}
                        isSelected={acceptedCommentId === item.id}
                      />
                      <CommentP>{item.comment}</CommentP>
                      <CommentComp.Emojis emojis={item.emojis} />
                    </CommentComp.Wrapper>
                  </li>
                ))}
              </React.Fragment>
            );
          },
        )}
      </ul>
    </ConatinerDiv>
  );
};

export default QnACommentList;
