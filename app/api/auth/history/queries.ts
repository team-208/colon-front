import { useQuery } from '@tanstack/react-query';
import supabaseClient from '@/app/utils/supabase/client';
import QUERY_KEYS from '../../queryKeys';
import { GetHistoryQuery } from './type';
import { fetchGetHistory } from './fetch';

const useHistoryQuery = ({ historyType }: GetHistoryQuery) => {
  const { auth } = supabaseClient;

  return useQuery({
    queryKey: QUERY_KEYS.historyList({ historyType }),
    queryFn: () => fetchGetHistory({ historyType }),
    enabled: !!auth.getSession(),
  });
};

export default useHistoryQuery;
