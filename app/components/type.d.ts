import { Post, Comment } from '../types/data';

export interface UserPost extends Post {
  reaction: string;
  type: string;
}

export interface UserComment extends Comment {
  type: string;
}
