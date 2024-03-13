'use client';

import styled from 'styled-components';

const ContainerHeader = styled.header`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  background-color: #e0e0e0;
  height: 60px;
`;

const Header = () => {
  return (
    <ContainerHeader>
      <h1>아이콘</h1>
      <h1>[page1]</h1>
      <h1>[page2]</h1>
    </ContainerHeader>
  );
};

export default Header;
