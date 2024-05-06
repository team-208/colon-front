export interface CommentEmojis {}

export interface InsertCommentRequest {
  original_comment?: number;
  comment: string;
  post_id: number;
}

export interface InsertCommentResponse {
  success: boolean;
}
