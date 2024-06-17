import { JOB_GROUP_TYPES } from '../../auth/user/type';
import { POST_STATUS, POST_STATUS_TYPES } from '../type';

export interface GetPostResponse {
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
  accepted_comment_id: number;
}

export interface UpdatePostRequest {
  id: number;
  status: POST_STATUS_TYPES;
  requested_major?: JOB_GROUP_TYPES | 'ALL';
  title?: string;
  body?: { data: string; created_at: string };
  preview_body?: string;
  tags?: string[];
}

export interface UpdatePostResponse {
  success: boolean;
}
