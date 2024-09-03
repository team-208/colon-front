import { Dayjs } from 'dayjs';
import { JOB_GROUP_TYPES } from '../auth/user/type';
import { ReactionObjType } from '@/app/components/common/PostComp/type';

export type POST_STATUS_TYPES = 'EDITING' | 'COMPLETE';

export interface InsertPostRequest {
  status: POST_STATUS_TYPES;
  requested_major: JOB_GROUP_TYPES;
  title: string;
  body: string;
  preview_body: string;
  tags?: string[];
  author_major: JOB_GROUP_TYPES;
  author_nickname: string;
  author_profile_url: string;
}

export interface InsertPostResponse {
  success: boolean;
  postId: number;
}

export type PostListOrderTypes = 'DATE_DESC' | 'REACTION_DESC' | 'COMMENT_DESC' | 'SCRAP_DESC';

export interface GetPostListQuery {
  order: PostListOrderTypes;
  major: JOB_GROUP_TYPES;
  offset: number;
}

export interface PostListItem {
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

export interface GetPostListResponse {
  success: boolean;
  offset: number;
  totalCount: number;
  count: number;
  list: PostListItem[];
}
