import { useMutation } from '@tanstack/react-query';
import { fetchInsertPostScrap } from './fetch';
import { InsertPostScrapRequest } from './type';

export const useInsertPostScrapMutation = () =>
  useMutation({ mutationFn: (body: InsertPostScrapRequest) => fetchInsertPostScrap(body) });
