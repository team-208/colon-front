import { JOB_GROUP_TYPES } from '../../auth/user/type';
import { POST_STATUS } from '../type';

export interface GetPostResponse {
  status: POST_STATUS;
  requested_major: JOB_GROUP_TYPES;
  title: string;
  body: string;
  preview_body: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  author_nickname: string;
  author_major: string;
  author_profile_url: string;
}
