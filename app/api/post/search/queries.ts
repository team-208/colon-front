import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../../queryKeys';
import { fetchGetPostSearch } from './fetch';

const usePostSearchQuery = (word: string) =>
  useQuery({
    queryKey: QUERY_KEYS.postSearch(word),
    queryFn: () => fetchGetPostSearch(word),
    enabled: false,
  });

export default usePostSearchQuery;
