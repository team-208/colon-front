const authUserSession = ['auth', 'user'];
const authNickName = ['nickname'];
const postId = (id: string) => ['post', `/${id}`];
const commentList = (postId: string) => ['comment', `/${postId}`];

const QUERY_KEYS = {
  authUserSession,
  authNickName,
  postId,
  commentList,
};

export default QUERY_KEYS;
