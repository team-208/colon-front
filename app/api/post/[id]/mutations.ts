import { useMutation } from '@tanstack/react-query';
import { fetchDeletePost, fetchUpdatePost } from './fetch';
import { UpdatePostRequest } from './type';

export const useModifyPostMutation = () =>
  useMutation({ mutationFn: (body: UpdatePostRequest) => fetchUpdatePost(body) });

export const useDeletePostMutation = () =>
  useMutation({ mutationFn: (id: string) => fetchDeletePost(id) });
