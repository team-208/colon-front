export interface InsertPostScrapRequest {
  postId: number;
}

export interface InsertPostScrapResponse {
  success: boolean;
}

export interface PostScrapListItem {
  id: number;
  post_id: number;
  created_at: string;
}
export interface GetPostScrapListResponse {
  success: boolean;
  list: PostScrapListItem[];
}
