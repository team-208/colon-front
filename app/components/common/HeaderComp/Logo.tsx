'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import logoImg from '../../../assets/images/logo.png';

const LogoContainer = styled.div`
  position: relative;
  width: 80px;
  height: 18px;
  margin-right: 24px;
`;

const Logo = () => {
  return (
    <Link href="/">
      <LogoContainer>
        <Image alt="" src={logoImg} sizes="80px" fill />
      </LogoContainer>
    </Link>
  );
};

export default Logo;
