'use client';

import { useCallback } from 'react';
import styled from 'styled-components';
import { Comment } from '@/app/types/data';

type Props = Comment & { isDelete?: boolean };

const CommentContainerdiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
`;

const CommentTextP = styled.p`
  font-size: 20px;
  margin-bottom: 15px;
`;

const CommentPostTitleP = styled.p`
  font-size: 20px;
  color: #d9d9d9;
`;

const CommentButtonLayoutdiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  > *:not(:last-child) {
    margin-right: 4px;
  }
`;

const CommentButton = styled.div`
  display: inline-block;
  padding: 8px;
  font-size: 20px;
  background: transparent;
`;

export default function Comment(props: Props) {
  const { id, postInfo, comment, isDelete } = props;

  const handleClickDelete = useCallback((id: number) => {
    // TODO: 삭제 api 연동
    console.log('삭제', id);
  }, []);

  return (
    <CommentContainerdiv>
      <CommentTextP>{comment}</CommentTextP>
      <CommentPostTitleP>{postInfo.title}</CommentPostTitleP>

      {isDelete && (
        <CommentButtonLayoutdiv>
          <CommentButton onClick={() => handleClickDelete(id)}>삭제</CommentButton>
        </CommentButtonLayoutdiv>
      )}
    </CommentContainerdiv>
  );
}
