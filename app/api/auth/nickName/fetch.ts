import { GetNickNameResponse } from './type';

export const fetchNickName = async () => {
  const res = await fetch('/api/auth/nickName');

  const jsonData = (await res.json()) as GetNickNameResponse;
  return jsonData;
};
