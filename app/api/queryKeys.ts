const authUserSession = ['auth', 'user'];
const authNickName = ['nickname'];
const postId = (id: string) => ['post', `/${id}`];
const postSearch = (word: string) => ['post', `/${word}`];
const postList = () => ['post', `infinitequery`];
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
