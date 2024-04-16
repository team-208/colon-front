import { GetPostResponse } from './type';

export const fetchGetPost = async (id: string) => {
  const res = await fetch(`/api/post/${id}`);
  const jsonData = (await res.json()) as GetPostResponse;
  return jsonData;
};
