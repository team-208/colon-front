import { getHost } from '@/app/utils/host';
import { GetPostResponse, UpdatePostRequest, UpdatePostResponse } from './type';

export const fetchGetPost = async (id: string) => {
  const host = getHost();
  const res = await fetch(`${host}/api/post/${id}`);
  const jsonData = (await res.json()) as GetPostResponse;
  return jsonData;
};

export const fetchUpdatePost = async (body: UpdatePostRequest) => {
  const res = await fetch(`/api/post/${body.id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  const jsonData = (await res.json()) as UpdatePostResponse;
  return jsonData;
};
