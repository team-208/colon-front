import { GetPostListQuery } from './post/type';

const authUserSession = ['auth', 'user'];
const authNickName = ['nickname'];
const postId = (id: string) => ['post', `/${id}`];
const postList = ({ order, major }: Omit<GetPostListQuery, 'offset'>) => [
  'post',
  `/infinitequery`,
  `/${order}`,
  `/${major}`,
];
const postSearch = (word: string) => ['post', `/${word}`];
const commentList = (postId: string) => ['comment', `/${postId}`];

const QUERY_KEYS = {
  authUserSession,
  authNickName,
  postId,
  postSearch,
  postList,
  commentList,
};

export default QUERY_KEYS;
