import dayjs from 'dayjs';
import { ReactNode } from 'react';

export interface Post {
  id: number;
  date: dayjs.Dayjs;
  title: string;
  content: string;
  nickname: string;
  modified: boolean;
  solved: boolean;
  isModify?: boolean;
  children?: ReactNode;
}

export interface Comment {
  id: number;
  date: dayjs.Dayjs;
  postInfo: { id: number; date: dayjs.Dayjs; title: string };
  comment: string;
}
