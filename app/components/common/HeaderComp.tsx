'use client';

import useAuth from '@/app/hooks/useAuth';
import styled from 'styled-components';

const ContainerHeader = styled.header`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  background-color: #e0e0e0;
  height: 60px;
`;

const HeaderComp = () => {
  // TODO: 로그인 확인용 임시 로직
  const { userInfo } = useAuth();

  return (
    <ContainerHeader>
      <h1>아이콘</h1>
      <h1>[page1]</h1>
      <h1>[page2]</h1>
      <h1>{`로그인 유저: ${userInfo?.user?.nick_name}` ?? ''}</h1>
    </ContainerHeader>
  );
};

export default HeaderComp;
