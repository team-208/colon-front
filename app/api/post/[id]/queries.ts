import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../../queryKeys';
import { fetchGetPost } from './fetch';

const usePostQuery = (id: string) =>
  useQuery({
    queryKey: QUERY_KEYS.postId(id),
    queryFn: () => fetchGetPost(id),
  });

export default usePostQuery;
