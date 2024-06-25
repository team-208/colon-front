export interface InsertPostScrapRequest {
  postId: number;
}

export interface InsertPostScrapResponse {
  success: boolean;
}

// TODO: 추후 삭제 가능성 있음
export interface PostScrapListItem {
  id: number;
  post_id: number;
  created_at: string;
}
export interface GetPostScrapListResponse {
  success: boolean;
  list: PostScrapListItem[];
}
