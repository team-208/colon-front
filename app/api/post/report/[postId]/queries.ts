import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../../../queryKeys';
import { fetchGetReport } from './fetch';

const useReportQuery = (postId: number) =>
  useQuery({
    queryKey: QUERY_KEYS.report(postId),
    queryFn: () => fetchGetReport(postId),
  });

export default useReportQuery;
