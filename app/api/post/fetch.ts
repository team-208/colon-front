import { InsertPostRequest, InsertPostResponse } from './type';

export const fetchInsertPost = async (body: InsertPostRequest) => {
  const res = await fetch('/api/post', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  const jsonData = (await res.json()) as InsertPostResponse;
  return jsonData;
};
