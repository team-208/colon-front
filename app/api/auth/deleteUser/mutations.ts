import { useMutation } from '@tanstack/react-query';
import { fetchDeleteUser } from './fetch';

const useDeleteUserMutation = () => useMutation({ mutationFn: () => fetchDeleteUser() });

export default useDeleteUserMutation;
