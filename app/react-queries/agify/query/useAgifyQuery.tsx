import { useQuery } from '@tanstack/react-query';
import AgifyAPI from '../api';
import { AgifyKeys } from '../key';

const useAgifyQuery = (name: string) =>
  useQuery<Agify.getAgifyResponse, Error>({
    queryKey: AgifyKeys.agify(name),
    queryFn: () => AgifyAPI.getAgify(name),
  });

export default useAgifyQuery;
