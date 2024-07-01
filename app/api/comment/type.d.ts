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

export interface DeleteCommentRequest {
  id: string;
}

export interface DeleteCommentResponse {
  success: boolean;
}
