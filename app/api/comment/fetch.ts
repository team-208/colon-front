import {
  InsertCommentResponse,
  InsertCommentRequest,
  DeleteCommentRequest,
  DeleteCommentResponse,
} from './type';

export const fetchInsertComment = async (body: InsertCommentRequest) => {
  const res = await fetch(`/api/comment`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  const jsonData = (await res.json()) as InsertCommentResponse;
  return jsonData;
};

export const fetchDeleteComment = async (body: DeleteCommentRequest) => {
  const res = await fetch(`/api/comment`, {
    method: 'DELETE',
    body: JSON.stringify(body),
  });

  const jsonData = (await res.json()) as DeleteCommentResponse;
  return jsonData;
};
