import { Post, Comment } from '../types/data';

export interface UserPost extends Post {
  type: string;
}

export interface UserComment extends Comment {
  type: string;
}
