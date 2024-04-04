import { useMutation } from '@tanstack/react-query';
import { fetchSignUpUser } from './fetch';
import { SignUpUserRequest } from './type';

const useSignUpUserMutation = () =>
  useMutation({ mutationFn: (body: SignUpUserRequest) => fetchSignUpUser(body) });

export default useSignUpUserMutation;
