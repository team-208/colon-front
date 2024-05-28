import dayjs, { Dayjs } from 'dayjs';
import { JOB_GROUP_TYPES } from '../api/auth/user/type';

export interface Post {
  status: string;
  requestedMajor: JOB_GROUP_TYPES;
  title: string;
  bodyUrl: string;
  previewBody: string;
  tages: string[];
  createdAt: Dayjs;
  updatedAt: Dayjs;
  author_nickname: string;
  author_major: JOB_GROUP_TYPES;
  author_profile_url: string;
}

export interface Comment {
  id: number;
  date: dayjs.Dayjs;
  postInfo: { id: number; date: dayjs.Dayjs; title: string };
  comment: string;
}
