import { useMutation } from '@tanstack/react-query';
import { UpdateCommentReactionRequest } from './type';
import { fetchUpdateCommentReaction } from './fetch';

export const useUpdateCommentReactionMutation = () =>
  useMutation({
    mutationFn: (body: UpdateCommentReactionRequest) => fetchUpdateCommentReaction(body),
  });
