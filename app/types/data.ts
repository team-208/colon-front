import { ReactNode } from 'react';

export interface Post {
  id: number;
  date: Date;
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
  date: Date;
  postInfo: { id: number; date: Date; title: string };
  comment: string;
}
