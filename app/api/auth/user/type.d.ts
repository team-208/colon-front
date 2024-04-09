import { Session } from '@supabase/supabase-js';
import dayjs from 'dayjs';

export type JOB_GROUP_TYPES = 'PLANNING' | 'DESIGN' | 'DEVELOP';

export interface SignUpUserRequest {
  major: JOB_GROUP_TYPES;
  profile_url: string;
  nick_name: string;
  created_at: dayjs.Dayjs;
  updated_at: dayjs.Dayjs;
}

export interface SignUpUserResponse {
  success: boolean;
}

export interface GetUserResponse extends Session {
  user: {
    profile_url: string;
    nick_name: string;
    major: string;
    created_at: string;
    updated_at: string;
  };
}

export interface UpdateUserRequest {
  major?: JOB_GROUP_TYPES;
  profile_url?: string;
  nick_name?: string;
  updated_at?: dayjs.Dayjs;
}
