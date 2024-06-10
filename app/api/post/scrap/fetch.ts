import { GetPostScrapListResponse, InsertPostScrapRequest } from './type';

export const fetchGetPostScrap = async () => {
  const res = await fetch('/api/post/scrap');
  const jsonData = (await res.json()) as GetPostScrapListResponse;
  return jsonData;
};

export const fetchInsertPostScrap = async (body: InsertPostScrapRequest) => {
  const res = await fetch('/api/post/scrap', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  const jsonData = (await res.json()) as InsertPostScrapRequest;
  return jsonData;
};
