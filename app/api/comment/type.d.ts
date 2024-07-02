export interface CommentEmojis {}

export interface InsertCommentRequest {
  original_comment?: number;
  comment: string;
  post_id: number;
  author_nickname: string;
  author_major: string;
}

export interface InsertCommentResponse {
  success: boolean;
}

export interface UpdateCommentRequest {
  commentId: number;
  comment: string;
}

export interface UpdateCommentResponse {
  success: boolean;
}
