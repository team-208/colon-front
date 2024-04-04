import dayjs from 'dayjs';

export type JOB_GROUP_TYPES = 'PLANNING' | 'DESIGN' | 'DEVELOP';

export interface SignUpUserRequest {
  major: JOB_GROUP_TYPES;
  profile_url: string;
  created_at: dayjs.Dayjs;
  updated_at: dayjs.Dayjs;
}

export interface SignUpUserResponse {
  success: boolean;
}
