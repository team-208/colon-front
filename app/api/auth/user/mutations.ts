import { useMutation } from '@tanstack/react-query';
import { fetchSignUpUser, fetchUpdateUser } from './fetch';
import { SignUpUserRequest, UpdateUserRequest } from './type';

export const useSignUpUserMutation = () =>
  useMutation({ mutationFn: (body: SignUpUserRequest) => fetchSignUpUser(body) });

export const useUpdateUserMutation = () =>
  useMutation({ mutationFn: (body: UpdateUserRequest) => fetchUpdateUser(body) });
