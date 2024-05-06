'use client';

import { useInsertCommentMutation } from '@/app/api/comment/mutations';
import { InsertCommentRequest } from '@/app/api/comment/type';

const testData: InsertCommentRequest = {
  post_id: 7,
  comment: '댓글을 남겨보아요.',
};

export default function CommentPage() {
  const { mutateAsync } = useInsertCommentMutation();

  const handleClick = async () => {
    await mutateAsync({
      post_id: 7,
      comment: '댓글을 남겨보아요.',
    });
  };

  return (
    <main>
      <p>post id : {testData.post_id}</p>
      <p>comment: {testData.comment}</p>
      <br />
      <button onClick={handleClick}>post 추가</button>
    </main>
  );
}
