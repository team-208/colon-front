import dayjs, { Dayjs } from 'dayjs';
import { JOB_GROUP_TYPES } from '../api/auth/user/type';

export interface Post {
  id: number;
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
  author_nickname: string;
  author_major: JOB_GROUP_TYPES;
  comment: string;
  recommend_count: number;
  comment_count: number;
  postInfo: {
    status: string;
    requestedMajor: JOB_GROUP_TYPES;
    author_major: JOB_GROUP_TYPES;
    title: string;
  };
}
