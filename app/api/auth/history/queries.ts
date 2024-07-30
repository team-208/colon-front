import { useSuspenseQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../../queryKeys';
import { GetHistoryQuery } from './type';
import { fetchGetHistory } from './fetch';

const useHistoryQuery = ({ historyType }: GetHistoryQuery) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.historyList({ historyType }),
    queryFn: () => fetchGetHistory({ historyType }),
  });
};

export default useHistoryQuery;
