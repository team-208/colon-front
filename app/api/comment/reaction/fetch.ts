import { UpdateCommentReactionRequest, UpdateCommentReactionResponse } from './type';

export const fetchUpdateCommentReaction = async (body: UpdateCommentReactionRequest) => {
  const res = await fetch(`/api/comment/reaction`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

  const jsonData = (await res.json()) as UpdateCommentReactionResponse;
  return jsonData;
};
