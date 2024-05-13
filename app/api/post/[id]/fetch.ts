import { getHost } from '@/app/utils/host';
import { GetPostResponse } from './type';

export const fetchGetPost = async (id: string) => {
  const host = getHost();
  const res = await fetch(`${host}/api/post/${id}`);
  const jsonData = (await res.json()) as GetPostResponse;
  return jsonData;
};
