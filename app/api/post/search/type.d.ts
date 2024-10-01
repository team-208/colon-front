import { JOB_GROUP_TYPES } from '../../auth/user/type';
import { POST_STATUS, POST_STATUS_TYPES } from '../type';

export type SearchResponseTypes = 'post' | 'comment';

interface PostSearchItemProps {
  id: number;
  status: POST_STATUS_TYPES;
  requested_major: JOB_GROUP_TYPES;
  title: string;
  body: string;
  preview_body: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  author_nickname: string;
  author_major: JOB_GROUP_TYPES;
  author_profile_url: string;
  // TODO: tanstack hydrate 적용후 select 에서 ReactionsObjType 변환 필요
  reactions: string;
  comments_count: number;
  accept_comment_id: number[];
}

export interface GetPostSearchResponse {
  success: boolean;
  posts: PostSearchItemProps[];
  comments: PostSearchItemProps[];
}
