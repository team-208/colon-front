import { useQuery } from '@tanstack/react-query';
import supabaseClient from '@/app/utils/supabase/client';
import { fetchGetUserReactions } from './fetch';
import QUERY_KEYS from '@/app/api/queryKeys';

const useUserReactionsQuery = () => {
  const { auth } = supabaseClient;

  return useQuery({
    queryKey: QUERY_KEYS.authUserReactionsSession,
    queryFn: () => fetchGetUserReactions(),
    enabled: !!auth.getSession(),
  });
};

export default useUserReactionsQuery;
