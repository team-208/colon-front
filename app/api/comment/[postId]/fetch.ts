import { getHost } from '@/app/utils/host';
import { GetCommentsResponse } from './type';

export const fetchGetComments = async (postId: string) => {
  const host = getHost();
  const res = await fetch(`${host}/api/comment/${postId}`);
  const jsonData = (await res.json()) as GetCommentsResponse;
  return jsonData;
};
