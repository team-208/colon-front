export type ReportTypes = 'REGISTERED' | 'COMPLETE';

export interface ReportItem {
  id: number;
  post_id: number;
  comment_id?: number;
  user_nickname: string;
  reason: string;
  status: ReportTypes;
}

export interface GetReportResponse {
  success: boolean;
  list: ReportItem[];
}
