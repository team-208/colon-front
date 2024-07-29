import { useMutation } from '@tanstack/react-query';
import { UpdatePostReactionsRequest } from './type';
import { fetchUpdatePostReactions } from './fetch';

export const useModifyPostReactionsMutation = () =>
  useMutation({ mutationFn: (body: UpdatePostReactionsRequest) => fetchUpdatePostReactions(body) });
