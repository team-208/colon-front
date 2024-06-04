import { JOB_GROUP_TYPES } from '../../auth/user/type';
import { POST_STATUS, POST_STATUS_TYPES } from '../type';

export type SearchResponseTypes = 'post' | 'comment';

interface PostSearchItemProps {
  id: string;
  text: string;
}

export interface GetPostSearchResponse {
  success: boolean;
  posts: PostSearchItemProps[];
  comments: PostSearchItemProps[];
}
