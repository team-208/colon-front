import { useMutation } from '@tanstack/react-query';
import { fetchUpdatePost } from './fetch';
import { UpdatePostRequest } from './type';

export const useModifyPostMutation = () =>
  useMutation({ mutationFn: (body: UpdatePostRequest) => fetchUpdatePost(body) });
