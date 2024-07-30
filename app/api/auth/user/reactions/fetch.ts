import { GetUserReactionsResponse, UpdateUserReactionsRequest } from './type';

export const fetchGetUserReactions = async () => {
  const res = await fetch('/api/auth/user/reactions', {
    method: 'GET',
  });
  const jsonData = (await res.json()) as GetUserReactionsResponse;
  return jsonData;
};

export const fetchUpdateUserReactions = async (body: UpdateUserReactionsRequest) => {
  const res = await fetch('/api/auth/user/reactions', {
    method: 'PUT',
    body: JSON.stringify(body),
  });

  const jsonData = (await res.json()) as { success: boolean };
  return jsonData;
};
