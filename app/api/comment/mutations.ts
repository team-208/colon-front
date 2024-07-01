import { useMutation } from '@tanstack/react-query';
import { DeleteCommentRequest, InsertCommentRequest } from './type';
import { fetchDeleteComment, fetchInsertComment } from './fetch';

export const useInsertCommentMutation = () =>
  useMutation({ mutationFn: (body: InsertCommentRequest) => fetchInsertComment(body) });

export const useDeleteCommentMutation = () =>
  useMutation({ mutationFn: (body: DeleteCommentRequest) => fetchDeleteComment(body) });
