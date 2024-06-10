import { InsertPostScrapRequest } from './type';

export const fetchInsertPostScrap = async (body: InsertPostScrapRequest) => {
  const res = await fetch('/api/post/scrap', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  const jsonData = (await res.json()) as InsertPostScrapRequest;
  return jsonData;
};
