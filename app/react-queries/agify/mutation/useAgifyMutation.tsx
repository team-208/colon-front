import { useMutation } from '@tanstack/react-query';
import AgifyAPI from '../api';

const useAgifyMutation = (body: Agify.postAgifyRequest) =>
  useMutation({ mutationFn: () => AgifyAPI.postAgify(body) });

export default useAgifyMutation;
