import { useMutation } from '@tanstack/react-query';
import { InsertPostRequest } from './type';
import { fetchInsertPost } from './fetch';

export const useInsertPostMutation = () =>
  useMutation({ mutationFn: (body: InsertPostRequest) => fetchInsertPost(body) });
