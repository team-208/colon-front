'use client';

import React, { useCallback } from 'react';
import styled from 'styled-components';
import { cutText, dateText } from '@/app/utils/text';
import { Post } from '@/app/types/data';

type Props = Post;

const PostContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const PostDiv = styled.div`
  position: relative;
  width: 100%;
  padding: 12px;
  background: #d9d9d9;
  border-radius: 8px;
`;

const PostTitleP = styled.p`
  font-size: 25px;
  font-weight: bold;
`;

const PostTitleSpan = styled.span`
  font-size: 15px;
  font-weight: 400 !important;
`;

const PostContentP = styled.p`
  font-size: 20px;
  margin: 12px 0;
`;

const PostNicknameP = styled.p`
  font-size: 20px;
`;

const PostButtonLayoutDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  > *:not(:last-child) {
    margin-right: 4px;
  }
`;

const PostButton = styled.button`
  display: inline-block;
  padding: 8px;
  font-size: 20px;
  background: transparent;
`;

const Post = (props: Props) => {
  const { id, date, title, content, nickname, modified, solved, isModify, children } = props;

  const handleClickModify = useCallback((id: number) => {
    // TODO: 수정 api 연동
    console.log('수정', id);
  }, []);

  const handleClickDelete = useCallback((id: number) => {
    // TODO: 삭제 api 연동
    console.log('삭제', id);
  }, []);

  return (
    <PostContainerDiv>
      {children}

      <PostDiv>
        <PostTitleP>
          {solved ? '✅ ' : '🖐️ '}
          {cutText(title, 75, '...')}
          <PostTitleSpan>
            {dateText(date)}
            {modified && '(편집됨)'}
          </PostTitleSpan>
        </PostTitleP>

        {/* TODO: content 줄바꿈 => 띄어쓰기 및 75자 제한 생각할것 */}
        <PostContentP>{content}</PostContentP>

        <PostNicknameP>{nickname}</PostNicknameP>

        {isModify && (
          <PostButtonLayoutDiv>
            <PostButton onClick={() => handleClickModify(id)}>수정</PostButton>
            <PostButton onClick={() => handleClickDelete(id)}>삭제</PostButton>
          </PostButtonLayoutDiv>
        )}
      </PostDiv>
    </PostContainerDiv>
  );
};

export default React.memo(Post);
