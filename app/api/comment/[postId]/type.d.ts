export interface GetCommentsResponseItem {
  id: number;
  original_comment?: number;
  comment: string;
  emojis?: string;
  created_at: string;
  updated_at: string;
  post_id: number;

  // client computed props
  nestedComments: GetCommentsResponse[];
}

export interface GetCommentsResponse {
  success: boolean;
  data: GetCommentsResponseItem[];
}
