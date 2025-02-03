import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../queryKeys';
import { fetchGetAlarmList } from './fetch';
import supabaseClient from '@/app/utils/supabase/client';

const useAlarmListQuery = () => {
  const { auth } = supabaseClient;

  return useQuery({
    queryKey: QUERY_KEYS.alarmList(),
    queryFn: () => fetchGetAlarmList(),
    enabled: !!auth.getSession(),
    refetchInterval: 10000,
  });
};

export default useAlarmListQuery;
