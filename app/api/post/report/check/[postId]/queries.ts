import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../../../../queryKeys';
import { fetchGetReportCheck } from './fetch';

const useReportCheckQuery = (postId: number) =>
  useQuery({
    queryKey: QUERY_KEYS.reportCheck(postId),
    queryFn: () => fetchGetReportCheck(postId),
  });

export default useReportCheckQuery;
