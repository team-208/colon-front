import { Dayjs } from 'dayjs';
import { JOB_GROUP_TYPES } from '../auth/user/type';

export type POST_STATUS = 'EDITING' | 'COMPLETE';

export interface InsertPostRequest {
  status: POST_STATUS;
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
}
