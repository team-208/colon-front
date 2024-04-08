import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../../queryKeys';
import { fetchNickName } from './fetch';

const useNickNameQuery = () =>
  useQuery({
    queryKey: QUERY_KEYS.authNickName,
    queryFn: () => fetchNickName(),
    enabled: false,
  });

export default useNickNameQuery;
