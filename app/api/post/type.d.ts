import { JOB_GROUP_TYPES } from '../auth/user/type';

export type POST_STATUS = 'EDITING' | 'COMPLETE';

export interface InsertPostRequest {
  status: POST_STATUS;
  requested_major: JOB_GROUP_TYPES;
  title: string;
  tags?: string[];
  //   post: File;
  author_major: JOB_GROUP_TYPES;
  author_nickname: string;
}

export interface InsertPostResponse {
  success: boolean;
}
