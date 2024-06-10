import { GetHistoryQuery, GetHistoryResponse } from './type';

export const fetchGetHistory = async ({ historyType }: GetHistoryQuery) => {
  const res = await fetch(`/api/auth/history?historyType=${historyType}`);
  const jsonData = (await res.json()) as GetHistoryResponse;
  return jsonData;
};
