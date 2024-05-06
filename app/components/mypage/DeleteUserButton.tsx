'use client';

import styled from 'styled-components';
import useAuth from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';

const DeleteButton = styled.button`
  float: right;
  background: none;
  text-decoration: underline;
`;

const DeleteUserButton = () => {
  const { deleteUser } = useAuth();
  const { push } = useRouter();

  const handleClick = async () => {
    // TODO: 팝업창 띄우기

    await deleteUser();
    push('/');
  };

  return <DeleteButton onClick={handleClick}>탈퇴하기</DeleteButton>;
};

export default DeleteUserButton;
