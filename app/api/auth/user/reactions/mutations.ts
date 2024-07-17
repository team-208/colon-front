import { useMutation } from '@tanstack/react-query';
import { UpdateUserReactionsRequest } from './type';
import { fetchUpdateUserReactions } from './fetch';

export const useUserReactionsMutation = () =>
  useMutation({ mutationFn: (body: UpdateUserReactionsRequest) => fetchUpdateUserReactions(body) });
