import { useQuery } from '@tanstack/react-query';
import { fetchGetUser } from './fetch';
import supabaseClient from '@/app/utils/supabase/client';
import QUERY_KEYS from '../../queryKeys';

const useUserSessionQuery = () => {
  const { auth } = supabaseClient;

  return useQuery({
    queryKey: QUERY_KEYS.authUserSession,
    queryFn: () => fetchGetUser(),
    enabled: !!auth.getSession(),
  });
};

export default useUserSessionQuery;
