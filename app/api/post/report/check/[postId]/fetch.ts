import { GetReportCheckResponse } from './type';

export const fetchGetReportCheck = async (postId: number) => {
  const res = await fetch(`/api/repost/check/${postId}`);
  const jsonData = (await res.json()) as GetReportCheckResponse;
  return jsonData;
};
