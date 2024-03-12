'use client';

import { useRouter } from 'next/navigation';
import supabaseClient from '../utils/supabase/client';

const useAuth = () => {
  const { auth } = supabaseClient;
  const { push } = useRouter();

  const login = async () => {
    try {
      const { data, error } = await auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `localhost:3000/auth/callback`,
        },
      });
    } catch (error) {}
  };

  const logout = async () => {
    try {
      const { error } = await auth.signOut();
      push('/');
    } catch (error) {}
  };

  const deleteUser = async () => {
    try {
      await fetch('/api/auth/deleteUser', { method: 'POST', body: JSON.stringify({}) });
    } catch (error) {}
  };

  return { login, logout, deleteUser };
};

export default useAuth;
