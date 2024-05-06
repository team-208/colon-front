import { InsertCommentResponse, InsertCommentRequest } from './type';

export const fetchInsertComment = async (body: InsertCommentRequest) => {
  const res = await fetch(`/api/comment`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  const jsonData = (await res.json()) as InsertCommentResponse;
  return jsonData;
};
