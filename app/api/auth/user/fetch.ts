import { GetUserResponse, SignUpUserRequest, SignUpUserResponse, UpdateUserRequest } from './type';

export const fetchSignUpUser = async (body: SignUpUserRequest) => {
  const res = await fetch('/api/auth/user', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  const jsonData = (await res.json()) as SignUpUserResponse;
  return jsonData;
};

export const fetchGetUser = async () => {
  const res = await fetch('/api/auth/user');
  const jsonData = (await res.json()) as GetUserResponse;
  return jsonData;
};

export const fetchUpdateUser = async (body: UpdateUserRequest) => {
  const res = await fetch('/api/auth/user', {
    method: 'PUT',
    body: JSON.stringify(body),
  });

  const jsonData = (await res.json()) as { success: boolean };
  return jsonData;
};
