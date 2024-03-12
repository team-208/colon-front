'use client';

import { useRouter } from 'next/navigation';
import useAuth from '../../../hooks/useAuth';

export default function Home() {
  const router = useRouter();
  const { login, logout, deleteUser } = useAuth();

  return (
    <main>
      <p>개발자 사이드 프로젝트 HOME!</p>
      <br />
      <button
        onClick={() => {
          login();
        }}
      >
        kakao login
      </button>

      <br />
      <button
        onClick={() => {
          logout();
        }}
      >
        kakao logout
      </button>

      <br />
      <button
        onClick={() => {
          deleteUser();
        }}
      >
        kakao user remove
      </button>
    </main>
  );
}
