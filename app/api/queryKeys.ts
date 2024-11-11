import { GetHistoryQuery } from './auth/history/type';
import { GetPostListQuery } from './post/type';

const authUserSession = ['auth', 'user'];
const authUserReactionsSession = ['auth', 'user', 'reactions'];
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
const historyList = ({ historyType }: GetHistoryQuery) => ['history', `/${historyType}`];
const postScrapList = () => ['post', '/scrap'];
const report = (postId: number) => ['report', `/${postId}`];

const QUERY_KEYS = {
  authUserSession,
  authNickName,
  authUserReactionsSession,
  postId,
  postSearch,
  postList,
  commentList,
  historyList,
  postScrapList,
  report,
};

export default QUERY_KEYS;
