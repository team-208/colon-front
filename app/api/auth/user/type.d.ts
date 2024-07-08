import { Session } from '@supabase/supabase-js';
import dayjs from 'dayjs';

export type JOB_GROUP_TYPES = 'PLANNING' | 'DESIGN' | 'DEVELOP' | 'ALL';

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
    major: JOB_GROUP_TYPES;
    created_at: string;
    updated_at: string;
  };
  kakaoUserInfo: {
    avatar_url: string;
    email: string;
    email_verified: boolean;
    full_name: string;
    iss: string;
    name: string;
    phone_verified: boolean;
    preferred_username: string;
    provider_id: string;
    sub: string;
    user_name: string;
  };
}

export interface UpdateUserRequest {
  major?: JOB_GROUP_TYPES;
  profile_url?: string;
  nick_name?: string;
  updated_at?: dayjs.Dayjs;
}
