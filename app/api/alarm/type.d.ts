export type REPORT_STATUS_TYPES = 'REGISTERED' | 'COMPLETE';

// TODO: insert api 구현시 추가 필요.
export type ALARM_CONTENT_TYPES = 'post' | 'report';

export interface AlarmItemProps {
  id: number;
  user_id: string;
  content_type: ALARM_CONTENT_TYPES;
  content_id: number;
  message: string;
  is_confirmed_list: boolean;
  is_confirmed_detail: boolean;
  created_at: string;
}

export interface GetAlarmResponse {
  success: boolean;
  list: AlarmItemProps[];
}
