export type REPORT_STATUS_TYPES = 'REGISTERED' | 'COMPLETE';

export interface InsertPostReportRequest {
  postId: number;
  commentId?: number;
  userNickname: string;
  reason: string;
  status: REPORT_STATUS_TYPES;
}

export interface InsertPostReportResponse {
  success: boolean;
  offset: number;
  totalCount: number;
  count: number;
  list: PostListItem[];
}
