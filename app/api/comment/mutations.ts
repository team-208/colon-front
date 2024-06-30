import { useMutation } from '@tanstack/react-query';
import { InsertCommentRequest, UpdateCommentRequest } from './type';
import { fetchInsertComment, fetchUpdateComment } from './fetch';

export const useInsertCommentMutation = () =>
  useMutation({ mutationFn: (body: InsertCommentRequest) => fetchInsertComment(body) });

export const useUpdateCommentMutation = () =>
  useMutation({ mutationFn: (body: UpdateCommentRequest) => fetchUpdateComment(body) });
