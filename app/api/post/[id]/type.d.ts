import { ReactionObjType } from '@/app/components/common/PostComp/type';
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
  // TODO: tanstack hydrate 적용후 select 에서 ReactionsObjType 변환 필요
  reactions: string;
  accept_comment_id: number;
  comments_count: number;
  success: boolean;
}

export interface UpdatePostRequest {
  id: number;
  status: POST_STATUS_TYPES;
  requested_major?: JOB_GROUP_TYPES | undefined;
  title?: string | undefined;
  body?: { data: string; created_at: string } | undefined;
  preview_body?: string | undefined;
  tags?: string[] | undefined;
  accept_comment_id?: number;
}

export interface UpdatePostResponse {
  success: boolean;
}

export interface DeletePostResponse {
  success: boolean;
}
