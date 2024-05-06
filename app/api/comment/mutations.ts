import { useMutation } from '@tanstack/react-query';
import { InsertCommentRequest } from './type';
import { fetchInsertComment } from './fetch';

export const useInsertCommentMutation = () =>
  useMutation({ mutationFn: (body: InsertCommentRequest) => fetchInsertComment(body) });
