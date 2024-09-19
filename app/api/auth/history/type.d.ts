import { Session } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { JOB_GROUP_TYPES } from '../user/type';
import { POST_STATUS_TYPES } from '../../post/type';

export type HISTORY_TYPES = 'REACTIONS' | 'SCRAP' | 'ACTIVITY';

export interface GetHistoryQuery {
  historyType: HISTORY_TYPES;
}

export interface HistoryItemProps {
  type: 'POST' | 'COMMENT';
  post: HistoryPost;
  comment?: HistoryComment;
  updatedAt: string;
}

export interface HistoryPost {
  postId: number;
  postStatus?: POST_STATUS_TYPES;
  postAuthorMajor: JOB_GROUP_TYPES;
  postRequestedMajor: JOB_GROUP_TYPES;
  authorNickname: string;
  title: string;
  previewBody: string;
  userReaction?: ReactionType;
  isScrap?: boolean;
}

export interface HistoryComment {
  commentId?: number;
  commentAuthorMajor?: JOB_GROUP_TYPES;
  commentAuthorNickname?: string;
  comment?: string;
}

export interface GetHistoryResponse extends Session {
  success: boolean;
  list: HistoryItemProps[];
}
