const authUserSession = ['auth', 'user'];
const authNickName = ['nickname'];
const postId = (id: string) => ['post', `/${id}`];

const QUERY_KEYS = {
  authUserSession,
  authNickName,
  postId,
};

export default QUERY_KEYS;
