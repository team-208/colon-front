'use client';

import useCommentsQuery from '@/app/api/comment/[postId]/queries';
import { useInsertCommentMutation } from '@/app/api/comment/mutations';
import { InsertCommentRequest } from '@/app/api/comment/type';

const testData: InsertCommentRequest = {
  post_id: 7,
  author_nickname: '개발테스트1114',
  comment: '댓글을 남겨보아요. 대댓글',
};

export default function CommentPage() {
  const { data } = useCommentsQuery(testData.post_id.toString());
  const { mutateAsync } = useInsertCommentMutation();

  const handleClick = async () => {
    await mutateAsync(testData);
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
