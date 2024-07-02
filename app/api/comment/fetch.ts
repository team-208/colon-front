import {
  InsertCommentResponse,
  InsertCommentRequest,
  UpdateCommentRequest,
  UpdateCommentResponse,
} from './type';

export const fetchInsertComment = async (body: InsertCommentRequest) => {
  const res = await fetch(`/api/comment`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  const jsonData = (await res.json()) as InsertCommentResponse;
  return jsonData;
};

export const fetchUpdateComment = async (body: UpdateCommentRequest) => {
  const res = await fetch(`/api/comment`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

  const jsonData = (await res.json()) as UpdateCommentResponse;
  return jsonData;
};
