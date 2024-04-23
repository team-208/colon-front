'use client';

import { useRouter } from 'next/navigation';
import supabaseClient from '../utils/supabase/client';
import { isEmpty } from 'lodash';
import { JOB_GROUP_TYPES, UpdateUserRequest } from '../api/auth/user/type';
import dayjs from 'dayjs';
import useUserSessionQuery from '../api/auth/user/queries';
import useDeleteUserMutation from '../api/auth/deleteUser/mutations';
import { useSignUpUserMutation, useUpdateUserMutation } from '../api/auth/user/mutations';
import { removeUndefinedValue } from '../utils/converter';

const useAuth = () => {
  const { auth } = supabaseClient;
  const { push, replace } = useRouter();

  const { data: userInfo, refetch: refetchUserSession } = useUserSessionQuery();
  const { mutateAsync: deleteUserMutation } = useDeleteUserMutation();
  const { mutateAsync: signUpUserMutation } = useSignUpUserMutation();
  const { mutateAsync: updateUserMutation } = useUpdateUserMutation();

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

  const signUp = async ({
    major,
    profileUrl,
    nickname,
  }: {
    major: JOB_GROUP_TYPES;
    profileUrl: string;
    nickname: string;
  }) => {
    try {
      const { data: user } = await refetchUserSession();
      if (!isEmpty(user)) {
        alert('이미 가입된 회원 입니다. 로그인 화면으로 이동합니다.');
        replace('/login');
        return;
      }

      const { success } = await signUpUserMutation({
        major,
        profile_url: profileUrl,
        nick_name: nickname,
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

  const updateUser = async (requestBody: UpdateUserRequest) => {
    try {
      const { data: user } = await refetchUserSession();

      if (isEmpty(user)) {
        alert('로그인 후 이용할 수 있습니다. 로그인 화면으로 이동합니다.');
        replace('/login');
        return;
      }

      const convertedBody = removeUndefinedValue(requestBody);
      const { success } = await updateUserMutation({ ...convertedBody, updated_at: dayjs() });

      if (!success) {
        throw Error();
      }

      refetchUserSession();
      alert('수정 성공!');
    } catch (error) {
      alert('회원 정보 수정에 실패하였습니다.');
    }
  };

  return { login, logout, deleteUser, userInfo, signUp, updateUser };
};

export default useAuth;
