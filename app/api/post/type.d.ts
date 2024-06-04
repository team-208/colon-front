import { Dayjs } from 'dayjs';
import { JOB_GROUP_TYPES } from '../auth/user/type';

export type POST_STATUS_TYPES = 'EDITING' | 'COMPLETE';

export interface InsertPostRequest {
  status: POST_STATUS;
  requested_major: JOB_GROUP_TYPES | 'ALL';
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
}

export type PostListOrderTypes = 'DATE_DESC';

export interface GetPostListQuery {
  order: PostListOrderTypes;
  major: JOB_GROUP_TYPES | 'ALL';
  offset: number;
}

export interface PostListItem {
  id: number;
  status: POST_STATUS;
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
}

export interface GetPostListResponse {
  success: boolean;
  offset: number;
  totalCount: number;
  count: number;
  list: PostListItem[];
}
