import { InsertPostReportRequest, InsertPostReportResponse } from './type';

export const fetchInsertPostReport = async (body: InsertPostReportRequest) => {
  const res = await fetch('/api/report', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  const jsonData = (await res.json()) as InsertPostReportResponse;
  return jsonData;
};
