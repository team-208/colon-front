'use client';

import { useRouter } from 'next/navigation';
import supabaseClient from '../utils/supabase/client';
import { isEmpty } from 'lodash';
import { JOB_GROUP_TYPES } from '../api/auth/user/type';
import dayjs from 'dayjs';
import useUserSessionQuery from '../api/auth/user/queries';
import useDeleteUserMutation from '../api/auth/deleteUser/mutations';
import useSignUpUserMutation from '../api/auth/user/mutations';

const useAuth = () => {
  const { auth } = supabaseClient;
  const { push, replace } = useRouter();

  const { data: userInfo, refetch: refetchUserSession } = useUserSessionQuery();
  const { mutateAsync: deleteUserMutation } = useDeleteUserMutation();
  const { mutateAsync: signUpUserMutation } = useSignUpUserMutation();

  const login = async (redirectTo: string) => {
    try {
      await auth.signInWithOAuth({
        provider: 'kakao',
        options: { redirectTo: redirectTo },
      });
    } catch (error) {}
  };

  const logout = async () => {
    try {
      await auth.signOut();
      push('/');
    } catch (error) {}
  };

  const signUp = async (major: JOB_GROUP_TYPES) => {
    try {
      const { data: user } = await refetchUserSession();
      if (!isEmpty(user)) {
        alert('이미 가입된 회원 입니다. 로그인 화면으로 이동합니다.');
        replace('/login');
        return;
      }

      const { success } = await signUpUserMutation({
        major,
        profile_url: '/',
        created_at: dayjs(),
        updated_at: dayjs(),
      });

      if (!success) {
        throw Error();
      }

      alert('회원가입 성공!');
      replace('/');
    } catch (error) {
      alert('회원가입에 실패 하였습니다.(실패 화면 이동 필요.)');
    }
  };

  const deleteUser = async () => {
    try {
      await deleteUserMutation();
    } catch (error) {}
  };

  return { login, logout, deleteUser, userInfo, signUp };
};

export default useAuth;
