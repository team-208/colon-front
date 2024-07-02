import { useMutation } from '@tanstack/react-query';
import { DeleteCommentRequest, InsertCommentRequest, UpdateCommentRequest } from './type';
import { fetchDeleteComment, fetchInsertComment, fetchUpdateComment } from './fetch';

export const useInsertCommentMutation = () =>
  useMutation({ mutationFn: (body: InsertCommentRequest) => fetchInsertComment(body) });

export const useDeleteCommentMutation = () =>
  useMutation({ mutationFn: (body: DeleteCommentRequest) => fetchDeleteComment(body) });

export const useUpdateCommentMutation = () =>
  useMutation({ mutationFn: (body: UpdateCommentRequest) => fetchUpdateComment(body) });
