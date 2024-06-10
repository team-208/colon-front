import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../../queryKeys';
import { fetchGetPostScrap } from './fetch';

const usePostScrapQuery = () =>
  useQuery({
    queryKey: QUERY_KEYS.postScrapList(),
    queryFn: () => fetchGetPostScrap(),
  });

export default usePostScrapQuery;
