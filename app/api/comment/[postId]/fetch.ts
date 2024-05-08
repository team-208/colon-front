import { GetCommentsResponse } from './type';

export const fetchGetComments = async (postId: string) => {
  const res = await fetch(`/api/comment/${postId}`);
  const jsonData = (await res.json()) as GetCommentsResponse;
  return jsonData;
};
