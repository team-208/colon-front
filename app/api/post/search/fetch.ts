import { getHost } from '@/app/utils/host';
import { GetPostSearchResponse } from './type';

export const fetchGetPostSearch = async (word: string) => {
  const host = getHost();
  const res = await fetch(`${host}/api/post/search?word=${word}`);
  const jsonData = (await res.json()) as GetPostSearchResponse;
  return jsonData;
};
