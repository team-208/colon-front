import { UpdatePostReactionsRequest, UpdatePostReactionsResponse } from './type';

export const fetchUpdatePostReactions = async (body: UpdatePostReactionsRequest) => {
  const res = await fetch(`/api/post/${body.postId}/reactions`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  const jsonData = (await res.json()) as UpdatePostReactionsResponse;
  return jsonData;
};
