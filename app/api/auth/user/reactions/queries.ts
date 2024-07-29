import { useQuery } from '@tanstack/react-query';
import { fetchGetUserReactions } from './fetch';
import QUERY_KEYS from '@/app/api/queryKeys';
import useAuth from '@/app/hooks/useAuth';
import { isEmpty } from 'lodash';

const useUserReactionsQuery = () => {
  const { userInfo } = useAuth();

  return useQuery({
    queryKey: QUERY_KEYS.authUserReactionsSession,
    queryFn: () => fetchGetUserReactions(),
    enabled: !isEmpty(userInfo),
  });
};

export default useUserReactionsQuery;
