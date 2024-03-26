'use client';

import { useRouter } from 'next/navigation';
import supabaseClient from '../utils/supabase/client';
import { isEmpty } from 'lodash';
import { JOB_GROUP_TYPES } from '../api/auth/user/type';

const useAuth = () => {
  const { auth } = supabaseClient;
  const { push, replace } = useRouter();

  const login = async () => {
    try {
      await auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `http://localhost:3000/api/auth/callback`,
        },
      });

      const user = await userInfo();
      if (isEmpty(user)) {
        alert('회원 가입이 필요합니다. 회원가입 화면으로 이동합니다.');
        replace('/examples/kakaologin');
        return;
      }

      push('/');
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
      const user = await userInfo();
      if (!isEmpty(user)) {
        alert('이미 가입된 회원 입니다. 로그인 화면으로 이동합니다.');
        replace('/');
        return;
      }

      // TODO: input field 연동 필요.
      const userPostFetch = await fetch('/api/auth/user', {
        method: 'POST',
        body: JSON.stringify({
          major,
          profile_url: '/',
          created_at: new Date(),
          updated_at: new Date(),
        }),
      });

      const { success } = await userPostFetch.json();

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
      await fetch('/api/auth/deleteUser', { method: 'POST', body: JSON.stringify({}) });
    } catch (error) {}
  };

  const userInfo = async () => {
    const userFetch = await fetch('/api/auth/user');
    return await userFetch.json();
  };

  return { login, logout, deleteUser, userInfo, signUp };
};

export default useAuth;
