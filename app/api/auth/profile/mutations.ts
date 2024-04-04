import { useMutation } from '@tanstack/react-query';
import { fetchProfileUpload } from './fetch';

const useProfileMutation = () =>
  useMutation({ mutationFn: (profile: File) => fetchProfileUpload(profile) });

export default useProfileMutation;
