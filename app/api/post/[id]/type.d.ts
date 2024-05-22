import { JOB_GROUP_TYPES } from '../../auth/user/type';
import { POST_STATUS, POST_STATUS_TYPES } from '../type';

export interface GetPostResponse {
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
