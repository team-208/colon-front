import { JOB_GROUP_TYPES } from '../../auth/user/type';

export interface GetCommentsResponseItem {
  id: number;
  original_comment?: number;
  comment: string;
  emojis?: string;
  created_at: string;
  updated_at: string;
  post_id: number;
  author_nickname: string;
  author_major: JOB_GROUP_TYPES;

  // client computed props
  nestedComments: GetCommentsResponse[];
}

export interface GetCommentsResponse {
  success: boolean;
  data: GetCommentsResponseItem[];
}
